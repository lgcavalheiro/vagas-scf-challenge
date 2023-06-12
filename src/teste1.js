const UsersDB = require("./fakeData");
const { STATUS_CODES } = require("http");
const { constants } = require("http2");

const getUser = (req, res, next) => {
  const name = req.query.name;

  const entry = UsersDB.getByName(name);

  if (!entry)
    res
      .status(constants.HTTP_STATUS_NOT_FOUND)
      .send(STATUS_CODES[constants.HTTP_STATUS_NOT_FOUND]);

  res.send(entry);
};

const getUsers = (req, res, next) => {
  res.send(UsersDB.getAll());
};

module.exports = {
  getUser,
  getUsers,
};
