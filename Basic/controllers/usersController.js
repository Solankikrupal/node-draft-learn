const bcrypt = require("bcrypt");
const User = require("../model/User");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and Password is required" });

  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate)
    return res.status(409).json({ message: "User already available" });
  try {
    //hashed Password
    const hspwd = await bcrypt.hash(pwd, 10);

    //store new user
    const results = await User.create({ username: user, password: hspwd });
    return res.status(200).json({ message: `New User ${user} added` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
