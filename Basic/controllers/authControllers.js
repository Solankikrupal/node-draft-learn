const bcrypt = require("bcrypt");
const fsPromises = require("fs").promises;
const path = require("path");
const data = {
  users: require("../data/users.json"),
  setUser: function (data) {
    this.users = data;
  },
};

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and Password is required" });
  const User = data.users.find((person) => person.username === user);
  if (!User) return res.status(409).json({ message: "User is not available" });
  try {
    const matchPwd = await bcrypt.compare(pwd, User.password);
    if (!matchPwd) {
      return res
        .status(500)
        .json({ message: "Please Check your Password/User" });
    } else {
      return res.status(200).json({ message: "Login Successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { handleLogin };
