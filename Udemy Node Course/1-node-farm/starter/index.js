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
const contentTypeHtml = { "Content-type": "text/html" };
const contentTypeJson = { "Content-type": "application/json" };

const dataPath = `${__dirname}/dev-data/data.json`;
const templateOverviewPath = `${__dirname}/templates/template-overview.html`;
const templateCardPath = `${__dirname}/templates/template-card.html`;
const templateProductPath = `${__dirname}/templates/template-product.html`;

const templateOverview = fs.readFileSync(templateOverviewPath, "utf-8");
const templateCard = fs.readFileSync(templateCardPath, "utf-8");
const templateProduct = fs.readFileSync(templateProductPath, "utf-8");

const data = fs.readFileSync(dataPath, "utf-8");
const dataObj = JSON.parse(data);

// HELPER FUNCTIONS
const replaceTemplate = function (str, product) {
    return str
        .replaceAll(
            "[[PRODUCT_IS_ORGANIC]]",
            `${product.organic ? "org" : "not-org"}`
        )
        .replaceAll("[[PRODUCT_IMAGE]]", product.image)
        .replaceAll("[[PRODUCT_NAME]]", product.name)
        .replaceAll("[[PRODUCT_FROM]]", product.from)
        .replaceAll("[[PRODUCT_NUTRIENTS]]", product.nutrients)
        .replaceAll("[[PRODUCT_PRICE]]", product.price)
        .replaceAll("[[PRODUCT_DESCRIPTION]]", product.description)
        .replaceAll("[[PRODUCT_QUANTITY]]", product.quantity);
};

const getCardListHtml = function () {
    return dataObj.map(function (product) {
        return replaceTemplate(templateCard, product);
    });
};

const server = http.createServer(function (req, res) {
    const pathName = req.url;

    switch (pathName) {
        case "/":
        case "/overview":
            const cardListHtml = getCardListHtml();
            const overViewHtml = templateOverview.replaceAll(
                "[[PRODUCT_CARD_LIST]]",
                cardListHtml
            );
            res.writeHead(200, contentTypeHtml);
            res.end(overViewHtml);
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
