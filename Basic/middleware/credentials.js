//Cross Origin Resourse Sharing
const allowedOrigin = require("../config/allowedOrigin");

const credentials = (req, res, next) => {
  const origin = req.header.origin;
  if (allowedOrigin.indexOf(origin) !== -1 || !origin) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};

module.exports = credentials;
