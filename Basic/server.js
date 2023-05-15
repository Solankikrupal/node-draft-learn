//common core modules
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOption");
const { Logger } = require("./middleware/LogEvents");
const ErrorHandler = require("./middleware/ErrorHandler");
PORT = process.env.PORT || 8000;

//express json
app.use(express.json());

//cors options
app.use(cors(corsOptions));

//Logging req in reqlog files
app.use(Logger);

//serve static files
app.use(express.static(path.join(__dirname, "/public")));

//router
app.use("/subdir", require("./routes/subdir"));
app.use("/employees", require("./routes/api/employees"));

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
