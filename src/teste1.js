const data = require("./fakeData");
const { STATUS_CODES } = require("http");
const { constants } = require("http2");

const getUser = (req, res, next) => {
  const name = req.query.name;
  const regex = new RegExp(name, "i");

  for (let entry of data) {
    if (entry.name.match(regex)) {
      res.send(entry);
      return;
    }
  }

  res
    .status(constants.HTTP_STATUS_NOT_FOUND)
    .send(STATUS_CODES[constants.HTTP_STATUS_NOT_FOUND]);
};

const getUsers = (req, res, next) => {
  res.send(data);
};

module.exports = {
  getUser,
  getUsers,
};
