//common core modules
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOption");
const { Logger } = require("./middleware/LogEvents");
const ErrorHandler = require("./middleware/ErrorHandler");
require("dotenv").config();
PORT = process.env.PORT || 8000;
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const crendentials = require("./middleware/credentials");
//express json
app.use(express.json());
//handle options crendential check - before cors
//and fetch cookies crendentials requirment
app.use(crendentials);

//cors options : Cross Origin Resource Sharing
app.use(cors(corsOptions));

//cookie parser
app.use(cookieParser());

//Logging req in reqlog files
app.use(Logger);

//serve static files
app.use(express.static(path.join(__dirname, "/public")));

//router
app.use("/subdir", require("./routes/subdir"));
app.use("/users", require("./routes/api/users"));
app.use("/auth", require("./routes/api/userAuth"));
app.use("/refresh", require("./routes/api/refresh"));
app.use("/logout", require("./routes/api/logout"));

app.use(verifyJWT); //It will run as middleware on all route of /employee OR you can also add this middleware in POST / GET /PUT /DELETE
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
