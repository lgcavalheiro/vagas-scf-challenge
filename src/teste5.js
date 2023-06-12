const UsersDB = require("./fakeData");
const { STATUS_CODES } = require("http");
const { constants } = require("http2");

module.exports = function (req, res) {
  const name = req.query.name;

  const readCount = UsersDB.getReadCountByName(name);

  if (!readCount) {
    res
      .status(constants.HTTP_STATUS_NOT_FOUND)
      .send(STATUS_CODES[constants.HTTP_STATUS_NOT_FOUND]);
    return;
  }

  res.send(`Usuário ${name} foi lido ${readCount} vez(es).`);
};
