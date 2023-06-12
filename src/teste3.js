const data = require("./fakeData");
const { STATUS_CODES } = require("http");
const { constants } = require("http2");

module.exports = function (req, res) {
  const name = req.query.name;

  for (let entry of data) {
    if (entry.name == name) {
      data.splice(data.indexOf(entry), 1);
      res.send(STATUS_CODES[constants.HTTP_STATUS_OK]);
      return;
    }
  }

  res
    .status(constants.HTTP_STATUS_NOT_FOUND)
    .send(STATUS_CODES[constants.HTTP_STATUS_NOT_FOUND]);
};
