const fsPromises = require("fs").promises;
const path = require("path");
const data = {
  users: require("../data/users.json"),
  setUser: function (data) {
    this.users = data;
  },
};

const handleLogout = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.sendStatus(204);
  const refreshToken = cookie.jwt;
  const User = data.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!User) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  const otherUser = data.users.filter(
    (person) => person.refreshToken !== User.refreshToken
  );

  const currentUser = { ...User, refreshToken: "" };
  data.setUser([...otherUser, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "data", "users.json"),
    JSON.stringify(data.users)
  );

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};

module.exports = { handleLogout };
