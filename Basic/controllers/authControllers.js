const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const fsPromises = require("fs").promises;
const path = require("path");
const data = {
  users: require("../data/users.json"),
  setUser: function (data) {
    this.users = data;
  },
};

const handleLogin = async function (req, res) {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and Password is required" });
  const User = data.users.find((person) => person.username === user);
  if (!User) return res.status(409).json({ message: "User is not available" });
  try {
    const matchPwd = await bcrypt.compare(pwd, User.password);
    if (matchPwd) {
      //jwt token
      //access token
      let accessToken = jwt.sign(
        { user: User.username },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "30s",
        }
      );
      //refresh token
      let refreshToken = jwt.sign(
        { user: User.username },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );

      //add refreshToken in current User
      const otherUsers = data.users.filter(
        (person) => person.username !== User.username
      );
      const currentUser = { ...User, refreshToken };
      data.setUser([...otherUsers, currentUser]);
      await fsPromises.writeFile(
        path.join(__dirname, "..", "data", "users.json"),
        JSON.stringify(data.users)
      );
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None", // in frontend site in network header column their will generate some error
        secure: true, // on same place after adding samesite to None also add this on clear Cookies 
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
