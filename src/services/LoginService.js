const UsersDB = require("../fakeData");
const jwt = require("jsonwebtoken");

const AUTH_SECRET = "JWT_AUTH_SECRET";

const login = (id) => {
  // TODO: DRY this and possibly segregate to a utils file
  if (!Number.isInteger(id) || id < 0) return;

  const user = UsersDB.getById(id);
  if (!user) return;
  if (!user.isAdmin) return;

  const token = jwt.sign({ id }, AUTH_SECRET, { expiresIn: 86400 });

  return {
    user,
    message: "Logged in successfully",
    token,
  };
};

module.exports = { login };
