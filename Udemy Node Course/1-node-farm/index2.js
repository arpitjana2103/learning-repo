const http = require("http");
const url = require("url");
const fs = require("fs");

// const server = http.createServer(function(req, res){
// })

const server = http.createServer();

// url/{pathname}/{pathname2}
// req.url = "/data?name=arpit"

server.on("request", function (req, res) {
    const { pathname, query } = url.parse(req.url, true);

    if (pathname === "/" || pathname === "/home") {
        res.writeHead(200, { "Content-type": "text/html" });
        res.end(`<h1>Home Page</h1>`);
    }

    if (pathname === "/product") {
        res.writeHead(200, { "Content-type": "text/html" });
        res.end(`<h1>Product Page</h1>`);
    }

    if (pathname === "/api") {
        res.writeHead(200, { "Content-type": "application/json" });
        const temp = fs.readFileSync("./temp.json", "utf-8");
        res.end(temp);
    }
});

server.listen(1234, "127.0.0.1", function () {
    console.log("My server has been started...");
});

// http://localhost:1234/
// http://127.0.0.1:1234/
