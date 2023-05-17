const jwt = require("jsonwebtoken");
const User = require("../model/User");

const handleRefreshToken = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.status(401).json({ message: "Not authorized" });
  const refreshToken = cookie.jwt;
  const userFound = await User.findOne({ refreshToken }).exec(); //no need add both if value and var is same
  console.log(userFound);
  if (!userFound)
    return res.status(409).json({ message: "User is not authorized" });
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || userFound.username !== decoded.user) return res.sendStatus(403);
    const roles = Object.values(userFound.roles);
    const accessToken = jwt.sign(
      { userInfo: { user: userFound.username, roles: roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
