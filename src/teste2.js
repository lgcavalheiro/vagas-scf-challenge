const UsersDB = require("./fakeData");

module.exports = function (req, res) {
  // TODO: validate fields if time allows for it
  const name = req.body.name;
  const job = req.body.job;

  const newEntry = UsersDB.insertEntry(name, job);

  res.send(newEntry);
};
