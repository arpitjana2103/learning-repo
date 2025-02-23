const fs = require("fs");
const http = require("http");
const url = require("url");

////////////////// FILE
/*
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
const textOut = `This is what we know about the avocado: ${textIn}.\nCreate on ${Date.now()}`;

fs.writeFileSync("./txt/output.txt", textOut);
console.log("File has been written");

// Non-Blocking, asynchronous
fs.readFile("./txt/start.txt", "utf-8", function (err, data01) {
    fs.readFile(`./txt/${data01}.txt`, "utf-8", function (err, data02) {
        fs.readFile(`./txt/${data01}.txt`, "utf-8", function (err, data03) {
            const data04 = `${data02}${data01}`;
            fs.writeFile("./txt/final.txt", "utf-8", data04, function (err) {
                console.log("Your File hasbeen written");
            });
        });
    });
});

console.log("Will read File");
*/

////////////////// SERVER
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer(function (request, response) {
    const pathName = request.url;

    switch (pathName) {
        case "/":
        case "/overview":
            response.end("This the Overview");
            break;

        case "/product":
            response.end("This is the Product Page");
            break;

        case "/api":
            response.writeHead(404, {
                "Content-type": "application/json",
            });
            response.end(data);
            break;

        default:
            response.writeHead(404, {
                "Content-type": "text/html",
            });
            response.end("<h1>404 Not Found</h1>");
    }
});

server.listen(8000, "127.0.0.1", function () {
    console.log("Listening to requests on port 8000");
});
