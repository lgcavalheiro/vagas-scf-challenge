const UsersDB = require("../fakeData");
const { validateIntField } = require("../utils/validation");
const jwt = require("jsonwebtoken");

const login = (id) => {
  const error = validateIntField(id, "id");

  if (error) return { errors: [error] };

  const user = UsersDB.getById(id);
  if (!user) return;
  if (!user.isAdmin) return;

  const token = jwt.sign({ id }, process.env.AUTH_SECRET, { expiresIn: 86400 });

  return {
    user,
    message: "Logged in successfully",
    token,
  };
};

module.exports = { login };
