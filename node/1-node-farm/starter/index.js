const fs = require("fs");

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
