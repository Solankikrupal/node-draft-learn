//common core modules
const express = require("express");
const app = express();
const path = require("path");
PORT = process.env.PORT || 8000;

/* app.get("/", (req, res) => {
  //res.sendFile("./index.html", { root: __dirname  });
  res.sendFile(path.join(__dirname, "index.html"));
}); */

app.get(
  "/refresh",
  (req, res, next) => {
    console.log("refresh");
  },
  (req, res) => {
    console.log("middleware");
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

const one = (req, res, next) => {
  console.log("one");
  next()
};
const two = (req, res, next) => {
  console.log("two");
  next()
};
const three = (req, res) => {
  console.log("three");
};

app.get("/",[one,two,three])
