const LogEvents = require("./LogEvents");

const ErrorHandler = (err, req, res, next) => {
  LogEvents(`${err.name}:${err.message}`, "errorLogs.txt");
  console.error(err.stack);
  res.status(500), send(err.message);
};

module.exports = ErrorHandler;
