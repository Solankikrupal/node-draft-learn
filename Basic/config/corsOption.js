//Cross Origin Resourse Sharing
const allowedOrigin = ["https://www.google.com"];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigin.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed by Cors"));
    }
    optionsSuccessStatus: 200;
  },
};

module.exports = corsOptions;
