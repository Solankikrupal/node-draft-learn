//common core modules
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { Logger } = require("./middleware/LogEvents");
const ErrorHandler = require("./middleware/ErrorHandler");
PORT = process.env.PORT || 8000;

//serve static files
app.use(express.static(path.join(__dirname, "/public")));

app.use(Logger);

//Cross Origin Resourse Sharing
const whiteList = ["https://www.google.com"];

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed by Cors"));
    }
    optionsSuccessStatus: 200;
  },
};

app.use(cors(corsOptions));

app.get("^/$|/index(.html)?|/home(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("^/blog(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "blog.html"));
});

//error handler 
app.use(ErrorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
