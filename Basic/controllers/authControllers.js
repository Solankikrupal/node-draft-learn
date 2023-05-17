const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and Password is required" });

  const userFound = await User.findOne({ username: user }).exec();
  if (!userFound)
    return res.status(409).json({ message: "User is not available" });
  try {
    const matchPwd = await bcrypt.compare(pwd, userFound.password);
    if (matchPwd) {
      const roles = Object.values(userFound.roles);
      //jwt token
      //access token
      let accessToken = jwt.sign(
        { userInfo: { user: userFound.username, roles: roles } },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "30s",
        }
      );

      //refresh token
      let refreshToken = jwt.sign(
        { user: userFound.username },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
      userFound.refreshToken = refreshToken;
      await userFound.save();

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None", // in frontend site in network header column their will generate some error
        // secure: true, // on same place after adding samesite to None also add this on clear Cookies// keep only for chrome not for testing
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({ accessToken });
    } else {
      return res
        .status(500)
        .json({ message: "Please Check your Password/User" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { handleLogin };
