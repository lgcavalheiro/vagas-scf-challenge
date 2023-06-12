const data = require("./fakeData");
const { STATUS_CODES } = require("http");
const { constants } = require("http2");

module.exports = function (req, res) {
  const id = req.query.id;

  const entry = data.find((d) => d.id === id);
  if (!entry) {
    res
      .status(constants.HTTP_STATUS_NOT_FOUND)
      .send(STATUS_CODES[constants.HTTP_STATUS_NOT_FOUND]);
    return;
  }

  entry.name = req.body.name;
  entry.job = req.body.job;

  res.send(entry);
};
