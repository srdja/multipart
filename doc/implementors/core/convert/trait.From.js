(function() {var implementors = {};
implementors['multipart'] = ["impl&lt;'a&gt; <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;&amp;'a <a class='primitive' href='https://doc.rust-lang.org/nightly/std/primitive.str.html'>str</a>&gt; for <a class='enum' href='https://hyperium.github.io/hyper/hyper/client/pool/enum.Scheme.html' title='hyper::client::pool::Scheme'>Scheme</a>","impl&lt;'a, R&gt; <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;&amp;'a mut R&gt; for <a class='enum' href='https://hyperium.github.io/hyper/hyper/client/enum.Body.html' title='hyper::client::Body'>Body</a>&lt;'a&gt; <span class='where'>where R: <a class='trait' href='https://doc.rust-lang.org/nightly/std/io/trait.Read.html' title='std::io::Read'>Read</a></span>","impl <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;<a class='struct' href='https://doc.rust-lang.org/nightly/std/io/error/struct.Error.html' title='std::io::error::Error'>Error</a>&gt; for <a class='enum' href='https://hyperium.github.io/hyper/hyper/error/enum.Error.html' title='hyper::error::Error'>Error</a>","impl <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;ParseError&gt; for <a class='enum' href='https://hyperium.github.io/hyper/hyper/error/enum.Error.html' title='hyper::error::Error'>Error</a>","impl <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;<a class='enum' href='https://sfackler.github.io/rust-openssl/doc/v0.7.9/openssl/ssl/error/enum.SslError.html' title='openssl::ssl::error::SslError'>SslError</a>&gt; for <a class='enum' href='https://hyperium.github.io/hyper/hyper/error/enum.Error.html' title='hyper::error::Error'>Error</a>","impl <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;<a class='struct' href='https://doc.rust-lang.org/nightly/core/str/struct.Utf8Error.html' title='core::str::Utf8Error'>Utf8Error</a>&gt; for <a class='enum' href='https://hyperium.github.io/hyper/hyper/error/enum.Error.html' title='hyper::error::Error'>Error</a>","impl <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;<a class='struct' href='https://doc.rust-lang.org/nightly/collections/string/struct.FromUtf8Error.html' title='collections::string::FromUtf8Error'>FromUtf8Error</a>&gt; for <a class='enum' href='https://hyperium.github.io/hyper/hyper/error/enum.Error.html' title='hyper::error::Error'>Error</a>","impl <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;Error&gt; for <a class='enum' href='https://hyperium.github.io/hyper/hyper/error/enum.Error.html' title='hyper::error::Error'>Error</a>","impl <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;<a class='enum' href='https://mlalic.github.io/solicit/solicit/http/enum.HttpError.html' title='solicit::http::HttpError'>HttpError</a>&gt; for <a class='enum' href='https://hyperium.github.io/hyper/hyper/error/enum.Error.html' title='hyper::error::Error'>Error</a>","impl&lt;T&gt; <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;<a class='struct' href='https://doc.rust-lang.org/nightly/collections/vec/struct.Vec.html' title='collections::vec::Vec'>Vec</a>&lt;T&gt;&gt; for <a class='struct' href='https://doc.rust-lang.org/nightly/collections/binary_heap/struct.BinaryHeap.html' title='collections::binary_heap::BinaryHeap'>BinaryHeap</a>&lt;T&gt; <span class='where'>where T: <a class='trait' href='https://doc.rust-lang.org/nightly/core/cmp/trait.Ord.html' title='core::cmp::Ord'>Ord</a></span>","impl&lt;T&gt; <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;<a class='struct' href='https://doc.rust-lang.org/nightly/collections/binary_heap/struct.BinaryHeap.html' title='collections::binary_heap::BinaryHeap'>BinaryHeap</a>&lt;T&gt;&gt; for <a class='struct' href='https://doc.rust-lang.org/nightly/collections/vec/struct.Vec.html' title='collections::vec::Vec'>Vec</a>&lt;T&gt;","impl&lt;'a, T&gt; <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;&amp;'a mut <a class='enum' href='https://doc.rust-lang.org/nightly/core/option/enum.Option.html' title='core::option::Option'>Option</a>&lt;<a class='struct' href='https://doc.rust-lang.org/nightly/alloc/boxed/struct.Box.html' title='alloc::boxed::Box'>Box</a>&lt;<a class='struct' href='https://doc.rust-lang.org/nightly/collections/linked_list/struct.Node.html' title='collections::linked_list::Node'>Node</a>&lt;T&gt;&gt;&gt;&gt; for <a class='struct' href='https://doc.rust-lang.org/nightly/collections/linked_list/struct.Rawlink.html' title='collections::linked_list::Rawlink'>Rawlink</a>&lt;<a class='struct' href='https://doc.rust-lang.org/nightly/collections/linked_list/struct.Node.html' title='collections::linked_list::Node'>Node</a>&lt;T&gt;&gt;","impl&lt;'a&gt; <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;&amp;'a <a class='primitive' href='https://doc.rust-lang.org/nightly/std/primitive.str.html'>str</a>&gt; for <a class='struct' href='https://doc.rust-lang.org/nightly/collections/string/struct.String.html' title='collections::string::String'>String</a>","impl&lt;'a&gt; <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;&amp;'a <a class='primitive' href='https://doc.rust-lang.org/nightly/std/primitive.str.html'>str</a>&gt; for <a class='enum' href='https://doc.rust-lang.org/nightly/collections/borrow/enum.Cow.html' title='collections::borrow::Cow'>Cow</a>&lt;'a, <a class='primitive' href='https://doc.rust-lang.org/nightly/std/primitive.str.html'>str</a>&gt;","impl&lt;'a&gt; <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;<a class='struct' href='https://doc.rust-lang.org/nightly/collections/string/struct.String.html' title='collections::string::String'>String</a>&gt; for <a class='enum' href='https://doc.rust-lang.org/nightly/collections/borrow/enum.Cow.html' title='collections::borrow::Cow'>Cow</a>&lt;'a, <a class='primitive' href='https://doc.rust-lang.org/nightly/std/primitive.str.html'>str</a>&gt;","impl&lt;'a, T&gt; <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;<a class='primitive' href='https://doc.rust-lang.org/nightly/std/primitive.slice.html'>&amp;'a [T]</a>&gt; for <a class='struct' href='https://doc.rust-lang.org/nightly/collections/vec/struct.Vec.html' title='collections::vec::Vec'>Vec</a>&lt;T&gt; <span class='where'>where T: <a class='trait' href='https://doc.rust-lang.org/nightly/core/clone/trait.Clone.html' title='core::clone::Clone'>Clone</a></span>","impl&lt;'a&gt; <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;&amp;'a <a class='primitive' href='https://doc.rust-lang.org/nightly/std/primitive.str.html'>str</a>&gt; for <a class='struct' href='https://doc.rust-lang.org/nightly/collections/vec/struct.Vec.html' title='collections::vec::Vec'>Vec</a>&lt;<a class='primitive' href='https://doc.rust-lang.org/nightly/std/primitive.u8.html'>u8</a>&gt;","impl&lt;T&gt; <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;T&gt; for <a class='struct' href='https://doc.rust-lang.org/nightly/alloc/boxed/struct.Box.html' title='alloc::boxed::Box'>Box</a>&lt;T&gt;","impl&lt;W&gt; <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;<a class='struct' href='https://hyperium.github.io/hyper/hyper/http/h1/struct.EndError.html' title='hyper::http::h1::EndError'>EndError</a>&lt;W&gt;&gt; for <a class='struct' href='https://doc.rust-lang.org/nightly/std/io/error/struct.Error.html' title='std::io::error::Error'>Error</a> <span class='where'>where W: <a class='trait' href='https://doc.rust-lang.org/nightly/std/io/trait.Write.html' title='std::io::Write'>Write</a></span>","impl <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;<a class='struct' href='https://doc.rust-lang.org/nightly/std/io/error/struct.Error.html' title='std::io::error::Error'>Error</a>&gt; for <a class='struct' href='https://hyperium.github.io/hyper/hyper/http/h2/struct.Http2ConnectError.html' title='hyper::http::h2::Http2ConnectError'>Http2ConnectError</a>","impl&lt;T&gt; <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;T&gt; for <a class='struct' href='https://doc.rust-lang.org/nightly/alloc/boxed/struct.Box.html' title='alloc::boxed::Box'>Box</a>&lt;<a class='trait' href='https://hyperium.github.io/hyper/hyper/net/trait.NetworkStream.html' title='hyper::net::NetworkStream'>NetworkStream</a> + 'static + <a class='trait' href='https://doc.rust-lang.org/nightly/core/marker/trait.Send.html' title='core::marker::Send'>Send</a>&gt; <span class='where'>where T: <a class='trait' href='https://doc.rust-lang.org/nightly/core/marker/trait.Send.html' title='core::marker::Send'>Send</a> + <a class='trait' href='https://hyperium.github.io/hyper/hyper/net/trait.NetworkStream.html' title='hyper::net::NetworkStream'>NetworkStream</a></span>","impl <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;<a class='struct' href='https://doc.rust-lang.org/nightly/std/net/tcp/struct.TcpListener.html' title='std::net::tcp::TcpListener'>TcpListener</a>&gt; for <a class='struct' href='https://hyperium.github.io/hyper/hyper/net/struct.HttpListener.html' title='hyper::net::HttpListener'>HttpListener</a>","impl <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;<a class='primitive' href='https://doc.rust-lang.org/nightly/std/primitive.i8.html'>i8</a>&gt; for StatusCode","impl <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;<a class='primitive' href='https://doc.rust-lang.org/nightly/std/primitive.u8.html'>u8</a>&gt; for StatusCode","impl <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;<a class='primitive' href='https://doc.rust-lang.org/nightly/std/primitive.i16.html'>i16</a>&gt; for StatusCode","impl <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;<a class='primitive' href='https://doc.rust-lang.org/nightly/std/primitive.u16.html'>u16</a>&gt; for StatusCode","impl <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;<a class='primitive' href='https://doc.rust-lang.org/nightly/std/primitive.i32.html'>i32</a>&gt; for StatusCode","impl <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;<a class='primitive' href='https://doc.rust-lang.org/nightly/std/primitive.u32.html'>u32</a>&gt; for StatusCode","impl <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;<a class='primitive' href='https://doc.rust-lang.org/nightly/std/primitive.tuple.html'>(<a class='primitive' href='https://doc.rust-lang.org/nightly/std/primitive.u8.html'>u8</a>, <a class='primitive' href='https://doc.rust-lang.org/nightly/std/primitive.u8.html'>u8</a>)</a>&gt; for HTTPVersion","impl <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;<a class='struct' href='https://doc.rust-lang.org/nightly/std/io/error/struct.Error.html' title='std::io::error::Error'>Error</a>&gt; for RequestCreationError","impl <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;<a class='struct' href='https://doc.rust-lang.org/nightly/std/net/tcp/struct.TcpStream.html' title='std::net::tcp::TcpStream'>TcpStream</a>&gt; for Stream","impl <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;<a class='struct' href='https://doc.rust-lang.org/nightly/std/io/error/struct.Error.html' title='std::io::error::Error'>Error</a>&gt; for Message","impl <a class='trait' href='https://doc.rust-lang.org/nightly/core/convert/trait.From.html' title='core::convert::From'>From</a>&lt;<a class='struct' href='multipart/server/tiny_http/struct.TinyHttpRequest.html' title='multipart::server::tiny_http::TinyHttpRequest'>Request</a>&gt; for Message",];

            if (window.register_implementors) {
                window.register_implementors(implementors);
            } else {
                window.pending_implementors = implementors;
            }
        
})()
