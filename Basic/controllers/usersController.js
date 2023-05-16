const bcrypt = require("bcrypt");
const fsPromises = require("fs").promises;
const path = require("path");
const data = {
  users: require("../data/users.json"),
  setUser: function (data) {
    this.users = data;
  },
};

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and Password is required" });

  const duplicate = data.users.find((person) => person.user === user);
  if (duplicate)
    return res.status(409).json({ message: "User already available" });
  try {
    //hashed Password
    const hspwd = await bcrypt.hash(pwd, 10);

    //store new user
    const newUser = { username: user, password: hspwd };

    //The spread syntax [...array, newArray]
    data.setUser([...data.users, newUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "data", "users.json"),
      JSON.stringify(data.users)
    );
    return res.status(200).json({ message: `New User ${user} added` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
