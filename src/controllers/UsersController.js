const UsersDB = require("../fakeData");
const { STATUS_CODES } = require("http");
const { constants } = require("http2");

// from teste1
const getUser = (req, res, next) => {
  const name = req.query.name;

  const entry = UsersDB.getByName(name);

  if (!entry || entry.length === 0)
    res
      .status(constants.HTTP_STATUS_NOT_FOUND)
      .send(STATUS_CODES[constants.HTTP_STATUS_NOT_FOUND]);

  res.send(entry);
};

// from teste1
const getUsers = (req, res, next) => {
  res.send(UsersDB.getAll());
};

// from teste2
const insertUser = (req, res) => {
  // TODO: validate fields if time allows for it
  const name = req.body.name;
  const job = req.body.job;

  const newEntry = UsersDB.insertEntry(name, job);

  res.send(newEntry);
};

// from teste3
const deleteUser = (req, res) => {
  const name = req.query.name;

  const deletedEntry = UsersDB.deleteByName(name);
  if (!deletedEntry) {
    res
      .status(constants.HTTP_STATUS_NOT_FOUND)
      .send(STATUS_CODES[constants.HTTP_STATUS_NOT_FOUND]);
    return;
  }

  res.send(STATUS_CODES[constants.HTTP_STATUS_OK]);
};

// from teste4
const updateUser = (req, res) => {
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

// from teste5
const getUserAccess = (req, res) => {
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

module.exports = {
  getUser,
  getUsers,
  insertUser,
  deleteUser,
  updateUser,
  getUserAccess,
};
