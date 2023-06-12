const data = require("./fakeData");
const { STATUS_CODES } = require("http");
const { constants } = require("http2");

module.exports = function (req, res) {
  let selectedUser;
  const name = req.query.name;

  for (let entry of data) {
    if (entry.name === name) selectedUser = entry;
  }

  if (!selectedUser) {
    res
      .status(constants.HTTP_STATUS_NOT_FOUND)
      .send(STATUS_CODES[constants.HTTP_STATUS_NOT_FOUND]);
    return;
  }

  res.send(
    `Usuário ${selectedUser.name} foi lido ${selectedUser.readCount} vez(es).`
  );
};
