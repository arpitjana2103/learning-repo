const fs = require("fs");
const http = require("http");
const path = require("path");

/////////////////////////////////
// FILES

// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written!');

// Non-blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   if (err) return console.log('ERROR! 💥');

//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//       console.log(data3);

//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//         console.log('Your file has been written 😁');
//       })
//     });
//   });
// });
// console.log('Will read file!');

/////////////////////////////////
// SERVER
const contentTypeTxt = { "Content-type": "text/plain" };
const contentTypeJson = { "Content-type": "application/json" };
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

const server = http.createServer(function (req, res) {
    const pathName = req.url;

    switch (pathName) {
        case "/":
        case "/overview":
            res.writeHead(200, contentTypeTxt);
            res.end("This is the OverView");
            break;

        case "/product":
            res.writeHead(200, contentTypeTxt);
            res.end("This is the PRODUCT");
            break;

        case "/api":
            res.writeHead(200, contentTypeJson);
            res.end(data);
            break;

        default:
            res.writeHead(404, contentTypeTxt);
            res.end("<h1>Page not found !!</h1>");
            break;
    }
});

server.listen(8000, "127.0.0.1", function () {
    console.log("Listening to requests on port 8000");
});
