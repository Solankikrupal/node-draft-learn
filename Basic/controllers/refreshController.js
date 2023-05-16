const jwt = require("jsonwebtoken");

const data = {
  users: require("../data/users.json"),
  setUser: function (data) {
    this.users = data;
  },
};

const handleRefreshToken = (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.status(401).json({ message: "Not authorized" });
  const refreshToken = cookie.jwt;
  const User = data.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!User) return res.status(409).json({ message: "User is not authorized" });
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || User.username !== decoded.user) return res.sendStatus(403);
    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
