//common core modules
const express = require("express");
const app = express();
const path = require("path");
const { Logger } = require("./middleware/LogEvents");
const ErrorHandler = require("./middleware/ErrorHandler");
PORT = process.env.PORT || 8000;

/* app.get("/", (req, res) => {
  //res.sendFile("./index.html", { root: __dirname  });
  res.sendFile(path.join(__dirname, "index.html"));
}); */

//'content-type'applications/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

//built-in middleware for json
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname, "/public")));

app.use(Logger);

app.get("^/$|/index(.html)?|/home(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("^/blog(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "blog.html"));
});
app.use(ErrorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

/* const one = (req, res, next) => {
  console.log("one");
  next();
};
const two = (req, res, next) => {
  console.log("two");
  next();
};
const three = (req, res) => {
  console.log("three");
};

/* app.get("/", [one, two, three]); */
