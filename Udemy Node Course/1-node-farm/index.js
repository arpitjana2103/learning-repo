const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const { replaceTemplate } = require("./modules/replaceTemplate");

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
const getCardListHtml = function () {
    return dataObj.map(function (product) {
        return replaceTemplate(templateCard, product);
    });
};

const getOverviewHtml = function () {
    const cardListHtml = getCardListHtml();
    return templateOverview.replaceAll("[[PRODUCT_CARD_LIST]]", cardListHtml);
};

console.log(slugify("Fresh Avocaods", { lower: true }));

const server = http.createServer();

// Listening for the "request" event
server.on("request", function (req, res) {
    const { query, pathname } = url.parse(req.url, true);
    switch (pathname) {
        case "/":
        case "/overview":
            const overViewHtml = getOverviewHtml();
            res.writeHead(200, contentTypeHtml);
            res.end(overViewHtml);
            break;

        case "/product":
            const product = dataObj[query.id];
            const productHtml = replaceTemplate(templateProduct, product);
            res.writeHead(200, contentTypeHtml);
            res.end(productHtml);
            break;

        case "/api":
            res.writeHead(200, contentTypeJson);
            res.end(data);
            break;

        default:
            res.writeHead(404, contentTypeHtml);
            res.end("<h1>Page not found !!</h1>");
            break;
    }
});

server.listen(8000, "127.0.0.1", function () {
    console.log("Listening to requests on port 8000");
});
