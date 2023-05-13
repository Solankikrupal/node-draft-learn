//common core modules
const http = require("http");
const fs = require("fs");
const fsPromise = require("fs").promises;
const path = require("path");
const LogEvents = require("./LogEvents");
const EventEmitter = require("events");
const { error } = require("console");
class Emitter extends EventEmitter {}

//inialize Object
const myEmitter = new Emitter();
myEmitter.on("log", (msg, fileName) => {
  LogEvents(msg, fileName);
});
PORT = process.env.PORT || 8000;

const serveFile = async (filePath, contentType, response) => {
  try {
    const data = await fsPromise.readFil(
      filePath,
      !contentType.includes("image") ? "utf-8" : ""
    );
    response.writeHead(200, { "Content-type": contentType });
    response.end(data);
  } catch (error) {
    console.log(error);
    myEmitter.emit(
      "log",
      `${error.name}\t\t${error.message}\t\t${error}`,
      "errorLogs.txt"
    );
    response.statusCode = 500;
    response.end();
  }
};
const server = http.createServer((req, res) => {
  const extension = path.extname(req.url).split("?");
  myEmitter.emit("log", `${req.url}\t\t${req.method}`, "reqLogs.txt");
  //console.log(extension)
  let contentType;
  switch (extension[0]) {
    case ".css":
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
      ? path.join(__dirname, req.url.split("?")[0])
      : path.join(__dirname, req.url.split("?")[0]);

  if (!extension && req.url.slice(-1) !== "/") {
    filePath += ".html";
  }

  const fileExist = fs.existsSync(filePath);
  if (fileExist) {
    //file exist
    myEmitter.emit(
      "log",
      `File Exist ${req.url}\t${req.method}`,
      "filesLogs.txt"
    );
    serveFile(filePath, contentType, res);
  } else {
    myEmitter.emit(
      "log",
      `File Not Exist ${req.url}\t${req.method}`,
      "filesLogs.txt"
    );
    console.log(path.parse(filePath));
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
