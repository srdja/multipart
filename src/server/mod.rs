//! The server-side implementation of `multipart/form-data` requests.
//!
//! Use this when you are implementing a server on top of Hyper and want to
//! to parse and serve POST `multipart/form-data` requests.
//!
//! See the `Multipart` struct for more info.

use hyper::header::ContentType;
use hyper::server::request::Request;
use hyper::method::Method;

use mime::{Mime, TopLevel, SubLevel, Attr, Value};

use super::{IntoString, MultipartField, MultipartFile};

use std::cmp;
use std::collections::HashMap;
use std::old_io::{IoError, IoResult, EndOfFile, standard_error, OtherIoError};
use std::ops::Deref;

pub mod handler;

fn is_multipart_formdata(req: &Request) -> bool {
    req.method == Method::Post && req.headers.get::<ContentType>().map_or(false, |ct| {
        let ContentType(ref mime) = *ct;

        debug!("Content-Type: {}", mime);

        match *mime {
            Mime(TopLevel::Multipart, SubLevel::FormData, _) => true,
            _ => false,
        }
    })
}

fn get_boundary(ct: &ContentType) -> Option<String> {
    let ContentType(ref mime) = *ct;
    let Mime(_, _, ref params) = *mime;

    params.iter().find(|&&(ref name, _)|
        if let Attr::Ext(ref name) = *name {
            "boundary" == &**name
        } else { false }
    ).and_then(|&(_, ref val)|
        if let Value::Ext(ref val) = *val {
            Some(val.clone())
        } else { None }
    )
}

/// The server-side implementation of `multipart/form-data` requests.
///
/// Create this with `Multipart::from_request()` passing a `server::Request` object from Hyper,
/// or give Hyper a `handler::Switch` instance instead,
/// then read individual entries with `.read_entry()` or process them all at once with
/// `.foreach_entry()`.
///
/// Implements `Deref<Request>` to allow access to read-only fields on `Request` without copying.
pub struct Multipart<'a> {
    source: BoundaryReader<Request<'a>>,
    tmp_dir: String,
}

macro_rules! try_find(
    ($haystack:expr, $f:ident, $needle:expr, $err:expr, $line:expr) => (
        try!($haystack.$f($needle).ok_or(line_error($err, $line.clone())))
    )
);

impl<'a> Multipart<'a> {

    /// If the given `Request` is a POST request of `Content-Type: multipart/form-data`,
    /// return the wrapped request as `Ok(Multipart)`, otherwise `Err(Request)`.
    ///
    /// See the `handler` submodule for a convenient wrapper for this function,
    /// `Switch`, that implements `hyper::server::Handler`.
    pub fn from_request(req: Request<'a>) -> Result<Multipart<'a>, Request<'a>> {
        if !is_multipart_formdata(&req) { return Err(req); }

        let boundary = if let Some(boundary) = req.headers.get::<ContentType>()
            .and_then(get_boundary) { boundary } else { return Err(req); };

        debug!("Boundary: {}", boundary);

        Ok(Multipart { source: BoundaryReader::from_reader(req, format!("--{}\r\n", boundary)), tmp_dir: ::random_alphanumeric(10) })
    }

    /// Read an entry from this multipart request, returning a pair with the field's name and
    /// contents. This will return an End of File error if there are no more entries.
    ///
    /// To get to the data, you will need to match on `MultipartField`.
    ///
    /// ##Warning
    /// If the last returned entry had contents of type `MultipartField::File`,
    /// calling this again will discard any unread contents of that entry!
    pub fn read_entry<'b>(&'b mut self) -> IoResult<(String, MultipartField<'b>)> {
        try!(self.source.consume_boundary());
        let (disp_type, field_name, filename) = try!(self.read_content_disposition());

        if &*disp_type != "form-data" {
            return Err(IoError {
                    kind: OtherIoError,
                    desc: "Content-Disposition value was not \"form-data\"",
                    detail: Some(format!("Content-Disposition: {}", disp_type)),
                });
        }

        if let Some(content_type) = try!(self.read_content_type()) {
            let _ = try!(self.source.read_line()); // Consume empty line
            Ok((field_name,
                MultipartField::File(
                    MultipartFile::from_octet(filename, &mut self.source, &content_type, &self.tmp_dir)
                )
            ))
        } else {
            // Empty line consumed by read_content_type()
            let text = try!(self.source.read_to_string());
            // The last two characters are "\r\n".
            // We can't do a simple trim because the content might be terminated
            // with line separators we want to preserve.
            Ok((field_name, MultipartField::Text(text[..text.len() - 2].into_string())))
        }
    }

    /// Call `f` for each entry in the multipart request.
    /// This is a substitute for `Multipart` implementing `Iterator`,
    /// since `Iterator::next()` can't use bound lifetimes.
    ///
    /// See https://www.reddit.com/r/rust/comments/2lkk\4\isize/concrete_lifetime_vs_bound_lifetime/
    pub fn foreach_entry<F: for<'b> FnMut(String, MultipartField<'b>)>(&'a mut self, mut f: F) {
        loop {
            match self.read_entry() {
                Ok((name, field)) => f(name, field),
                Err(err) => {
                    if err.kind != EndOfFile {
                        error!("Error reading Multipart: {}", err);
                    }

                    break;
                },
            }
        }
    }

    fn read_content_disposition(&mut self) -> IoResult<(String, String, Option<String>)> {
        let line = try!(self.source.read_line());

        // Find the end of CONT_DISP in the line
        let disp_type = {
            const CONT_DISP: &'static str = "Content-Disposition:";

            let disp_idx = try_find!(&line, find_str, CONT_DISP,
                "Content-Disposition subheader not found!", line) + CONT_DISP.len();

            let disp_type_end = try_find!(line[disp_idx..], find, ';',
                "Error parsing Content-Disposition value!", line);

            line[disp_idx .. disp_idx + disp_type_end].trim().into_string()
        };

        let field_name = {
            const NAME: &'static str = "name=\"";

            let name_idx = try_find!(&line, find_str, NAME,
                "Error parsing field name!", line) + NAME.len();

            let name_end = try_find!(line[name_idx ..], find, '"',
                "Error parsing field name!", line);

            line[name_idx .. name_idx + name_end].into_string() // No trim here since it's in quotes.
        };

        let filename = {
            const FILENAME: &'static str = "filename=\"";

            let filename_idx = line.find_str(FILENAME).map(|idx| idx + FILENAME.len());
            let filename_idxs = with(filename_idx, |&start| line[start ..].find('"'));

            filename_idxs.map(|(start, end)| line[start .. start + end].into_string())
        };

        Ok((disp_type, field_name, filename))
    }

    fn read_content_type(&mut self) -> IoResult<Option<String>> {
        debug!("Read content type!");
        let line = try!(self.source.read_line());

        const CONTENT_TYPE: &'static str = "Content-Type:";

        let type_idx = (&*line).find_str(CONTENT_TYPE);

        // FIXME Will not properly parse for multiple files!
        // Does not expect boundary=<boundary>
        Ok(type_idx.map(|start| line[start + CONTENT_TYPE.len()..].trim().into_string()))
    }

    /// Read the request fully, parsing all fields and saving all files to the given directory or a
    /// temporary, and return the result.
    ///
    /// If `dir` is none, chooses a random subdirectory under `std::os::tmpdir()`.
    pub fn save_all(mut self, dir: Option<&Path>) -> IoResult<Entries> {
        let dir = dir.map_or_else(|| ::std::os::tmpdir().join(&self.tmp_dir), |path| path.clone());

        let mut entries = Entries::with_path(dir);

        loop {
            match self.read_entry() {
                Ok((name, MultipartField::Text(text))) => { entries.fields.insert(name, text); },
                Ok((name, MultipartField::File(mut file))) => {
                    let path = try!(file.save_in(&entries.dir));
                    entries.files.insert(name, path);
                },
                Err(err) => {
                    if err.kind != EndOfFile {
                        error!("Error reading Multipart: {}", err);
                    }

                    break;
                },
            }
        }

        Ok(entries)
    }
}

impl<'a> Deref for Multipart<'a> {
    type Target = Request<'a>;
    fn deref(&self) -> &Request<'a> {
        self.source.borrow_reader()
    }
}

fn with<T, U, F: FnOnce(&T) -> Option<U>>(left: Option<T>, right: F) -> Option<(T, U)> {
    let temp = left.as_ref().and_then(right);
    match (left, temp) {
        (Some(lval), Some(rval)) => Some((lval, rval)),
        _ => None,
    }
}

fn line_error(msg: &'static str, line: String) -> IoError {
    IoError {
        kind: OtherIoError,
        desc: msg,
        detail: Some(line),
    }
}

/// A result of `Multipart::save_all()`.
pub struct Entries {
    pub fields: HashMap<String, String>,
    pub files: HashMap<String, Path>,
    /// The directory the files were saved under.
    pub dir: Path,
}

impl Entries {
    fn with_path(path: Path) -> Entries {
        Entries {
            fields: HashMap::new(),
            files: HashMap::new(),
            dir: path,
        }
    }
}

/* FIXME: Can't have an iterator return a borrowed reference
impl<'a> Iterator<(String, MultipartField<'a>)> for Multipart<'a> {
    fn next(&mut self) -> Option<(String, MultipartField<'a>)> {
        match self.read_entry() {
            Ok(ok) => Some(ok),
            Err(err) => {
                if err.kind != EndOfFile {
                    error!("Error reading Multipart: {}", err);
                }

                None
             },
        }
    }
}
*/

/// A `Reader` that will yield bytes until it sees a given sequence.
pub struct BoundaryReader<S> {
    reader: S,
    boundary: Vec<u8>,
    last_search_idx: usize,
    boundary_read: bool,
    buf: Vec<u8>,
    buf_len: usize,
}

fn eof<T>() -> IoResult<T> {
    Err(standard_error(EndOfFile))
}

const BUF_SIZE: usize = 1024 * 64; // 64k buffer

impl<S> BoundaryReader<S> where S: Reader {
    fn from_reader(reader: S, boundary: String) -> BoundaryReader<S> {
        let mut buf = Vec::with_capacity(BUF_SIZE);
        unsafe { buf.set_len(BUF_SIZE); }

        BoundaryReader {
            reader: reader,
            boundary: boundary.into_bytes(),
            last_search_idx: 0,
            boundary_read: false,
            buf: buf,
            buf_len: 0,
        }
    }

    fn read_to_boundary(&mut self) -> IoResult<()> {
         if !self.boundary_read {
            try!(self.true_fill_buf());

            if self.buf_len == 0 { return eof(); }

            let lookahead = &self.buf[self.last_search_idx .. self.buf_len];

            let search_idx = lookahead.position_elem(&self.boundary[0])
                .unwrap_or(lookahead.len() - 1);

            debug!("Search idx: {}", search_idx);

            self.boundary_read = lookahead[search_idx..]
                .starts_with(&self.boundary);

            self.last_search_idx += search_idx;

            if !self.boundary_read {
                self.last_search_idx += 1;
            }

        } else if self.last_search_idx == 0 {
            return Err(standard_error(EndOfFile))
        }

        Ok(())
    }

    /// Read bytes until the reader is full
    fn true_fill_buf(&mut self) -> IoResult<()> {
        let mut bytes_read = 1usize;

        while bytes_read != 0 {
            bytes_read = match self.reader.read(&mut self.buf[self.buf_len..]) {
                Ok(read) => read,
                Err(err) => if err.kind == EndOfFile { break; } else { return Err(err); },
            };

            self.buf_len += bytes_read;
        }

        Ok(())
    }

    fn _consume(&mut self, amt: usize) {
        use std::ptr::copy_memory;

        assert!(amt <= self.buf_len);

        let src = self.buf[amt..].as_ptr();
        let dest = self.buf.as_mut_ptr();

        unsafe { copy_memory(dest, src, self.buf_len - amt); }

        self.buf_len -= amt;
        self.last_search_idx -= amt;
    }

    fn consume_boundary(&mut self) -> IoResult<()> {
        while !self.boundary_read {
            match self.read_to_boundary() {
                Ok(_) => (),
                Err(e) => if e.kind == EndOfFile {
                    break;
                } else {
                    return Err(e);
                }
            }
        }

        let consume_amt = cmp::min(self.buf_len, self.last_search_idx + self.boundary.len());

        debug!("Consume amt: {} Buf len: {}", consume_amt, self.buf_len);

        self._consume(consume_amt);
        self.last_search_idx = 0;
        self.boundary_read = false;

        Ok(())
    }

    #[allow(unused)]
    fn set_boundary(&mut self, boundary: String) {
        self.boundary = boundary.into_bytes();
    }

    pub fn borrow_reader<'a>(&'a self) -> &'a S {
        &self.reader
    }
}

impl<S> Reader for BoundaryReader<S> where S: Reader {
    fn read(&mut self, buf: &mut [u8]) -> IoResult<usize> {
        use std::cmp;
        use std::slice::bytes::copy_memory;

        try!(self.read_to_boundary());

        let trunc_len = cmp::min(buf.len(), self.last_search_idx);
        copy_memory(buf, &self.buf[..trunc_len]);

        self._consume(trunc_len);

        Ok(trunc_len)
    }
}

impl<S> Buffer for BoundaryReader<S> where S: Reader {
    fn fill_buf<'a>(&'a mut self) -> IoResult<&'a [u8]> {
        try!(self.read_to_boundary());

        let buf = &self.buf[..self.last_search_idx];

        Ok(buf)
    }

    fn consume(&mut self, amt: usize) {
        assert!(amt <= self.last_search_idx);
        self._consume(amt);
    }
}

#[test]
fn test_boundary() {
    use std::io::BufReader;

    const BOUNDARY: &'static str = "--boundary\r\n";
    const TEST_VAL: &'static str = "\r
--boundary\r
dashed-value-1\r
--boundary\r
dashed-value-2\r
--boundary\r
";

    let test_reader = BufReader::new(TEST_VAL.as_bytes());
    let mut reader = BoundaryReader::from_reader(test_reader, BOUNDARY.into_string());

    debug!("Read 1");
    let string = reader.read_to_string().unwrap();
    debug!("{}", string);
    assert!(string.trim().is_empty());

    debug!("Consume 1");
    reader.consume_boundary().unwrap();

    debug!("Read 2");
    assert_eq!(reader.read_to_string().unwrap().trim(), "dashed-value-1");

    debug!("Consume 2");
    reader.consume_boundary().unwrap();

    debug!("Read 3");
    assert_eq!(reader.read_to_string().unwrap().trim(), "dashed-value-2");

    debug!("Consume 3");
    reader.consume_boundary().unwrap();

}