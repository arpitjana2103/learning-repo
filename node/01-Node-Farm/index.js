const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");

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

const templateOverview = fs.readFileSync(
    `${__dirname}/templates/template-overview.html`,
    "utf-8"
);
const templateCard = fs.readFileSync(
    `${__dirname}/templates/template-card.html`,
    "utf-8"
);
const templateProduct = fs.readFileSync(
    `${__dirname}/templates/template-product.html`,
    "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

function getOverViewHTML() {
    let productCards = "";
    dataObj.forEach(function (data) {
        productCards += replaceTemplate(templateCard, data);
    });
    return templateOverview.replaceAll("{%PRODUCTCARDS%}", productCards);
}

function getProductHTML(product) {
    return replaceTemplate(templateProduct, product);
}

const server = http.createServer(function (request, response) {
    const { query, pathname } = url.parse(request.url, true);

    switch (pathname) {
        case "/":
        case "/overview": {
            response.writeHead(200, {
                "Content-type": "text/html",
            });
            return response.end(getOverViewHTML());
        }

        case "/product": {
            const product = dataObj.at(query.id);
            response.writeHead(200, {
                "Content-type": "text/html",
            });
            return response.end(getProductHTML(product));
        }

        case "/api": {
            response.writeHead(404, {
                "Content-type": "application/json",
            });
            return response.end(data);
        }

        default: {
            response.writeHead(404, {
                "Content-type": "text/html",
            });
            return response.end("<h1>404 Not Found</h1>");
        }
    }
});

server.listen(5000, function () {
    console.log("Server is running : http://localhost:5000/");
});
