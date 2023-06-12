const data = require("./fakeData");

module.exports = function (req, res) {
  // TODO: validate fields if time allows for it
  const name = req.body.name;
  const job = req.body.job;
  const lastKnownIndex = data[data.length - 1].id;

  const newUser = {
    id: lastKnownIndex + 1,
    name: name,
    job: job,
  };

  data.push(newUser);

  res.send(newUser);
};
