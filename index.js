const http = require("http");
const url = require("url");
const fs = require("fs");
const slugify = require("slugify");
//this is synchronous but doesnt block the code bcos its a top level code in scope chain
const data = fs.readFileSync(`${__dirname}/dev_data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);
const server = http.createServer((req, res) => {
  const { query, pathName } = url.parse(req.url, true);

  //implementing routing
  //const pathName = req.url

  if (pathName === "/" || pathName === "overview") {
    return res.end("this is the overview");
  }
  if (pathName === "/product") {
    return res.end("this is the product");
  } else if (pathName === "/api") {
    return res.writeHead(200, { "content-type": "application/json" });
    res.end(data);
  }
  //to track for error... not found
  else {
    return res.writeHead(404, {
      "content-type": "text/html",
      "my-own-header": "hello world",
    });

    return res.end("<h1 >page not found </h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("server is listening to port:8000");
});
