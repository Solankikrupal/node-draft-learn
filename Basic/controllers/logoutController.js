const User = require("../model/User");

const handleLogout = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.sendStatus(204);
  const refreshToken = cookie.jwt;

  const userFound = await User.findOne({ refreshToken }).exec();
  if (!userFound) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None" /* secure: true */,
    });
    return res.sendStatus(204);
  }
  userFound.refreshToken = "";
  await userFound.save();
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None" /* secure: true */,
  });
  res.sendStatus(204);
};

module.exports = { handleLogout };
