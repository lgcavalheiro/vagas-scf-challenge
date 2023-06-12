const UsersDB = require("./fakeData");
const { STATUS_CODES } = require("http");
const { constants } = require("http2");

module.exports = function (req, res) {
  const id = req.query.id;
  const name = req.body.name;
  const job = req.body.job;

  const entry = UsersDB.updateEntry(id, name, job);
  if (!entry) {
    res
      .status(constants.HTTP_STATUS_NOT_FOUND)
      .send(STATUS_CODES[constants.HTTP_STATUS_NOT_FOUND]);
    return;
  }

  res.send(entry);
};
