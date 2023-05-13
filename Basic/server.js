//common core modules
const http = require("http");
const fs = require("fs");
const fsPromise = require("fs").promises;
const path = require("path");

const EventEmitter = require("events");
class Emitter extends EventEmitter {}

//inialize Object
const myEmitter = new Emitter();

PORT = process.env.PORT || 8000;

const serveFile = async (filePath, contentType, response) => {
  try {
    const data = await fsPromise.readFile(
      filePath,
      !contentType.includes("image")  ? "utf-8" : ""
    );
    response.writeHead(200, { "Content-type": contentType });
    response.end(data);
  } catch (error) {
    console.log(error);
    response.statusCode = 500;
    response.end();
  }
};
const server = http.createServer((req, res) => {
  //console.log(req.url, req.method);
  //You have check all files and add status header path to it this is not fisiable solution
  /* let filePath;
  if (req.url === "/" || req.url === "index.html") {
    console.log(__dirname)
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    filePath = path.join(__dirname, "", "index.html");
    console.log(filePath)
    fs.readFile(filePath,"utf-8",(err,data)=>{
        res.end(data);
    })
  } */

  const extension = path.extname(req.url).split("?");
  //console.log(extension)
  let contentType;
  switch (extension[0]) {
    case ".css" :
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg" || ".jpeg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/avif,image/webp,*/*";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    case ".woff2":
      contentType = "font/woff2";
      break;
    default:
      contentType = "text/html";
      break;
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, req.url.split('?')[0])
      : path.join(__dirname, req.url.split('?')[0]);

  if (!extension && req.url.slice(-1) !== "/") {
    filePath += ".html";
  }

  const fileExist = fs.existsSync(filePath);
  if (fileExist) {
    //file exist
    serveFile(filePath, contentType, res);
  } else {
    console.log(req.url);
    console.log(extension);
    console.log(contentType);
    console.log(path.parse(filePath));
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
