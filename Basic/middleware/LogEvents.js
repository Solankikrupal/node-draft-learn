const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const LogEvents = async (message, logFile) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t\t${uuid()}\t\t${message}\n`;

  console.log(dateTime);

  try {
    if (!fs.existsSync(path.join(__dirname, "../", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "../", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "../", "logs", logFile),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};

const Logger = (req, res, next) => {
  LogEvents(
    `${req.url}\t\t${req.headers.origin}\t\t${req.method}`,
    "reqLogs.txt"
  );
  next();
};

module.exports = { Logger, LogEvents };
