const usersService = require("../services/UsersService");
const { STATUS_CODES } = require("http");
const { constants } = require("http2");

// from teste1
const getUser = (req, res, next) => {
  const name = req.query.name;

  const entry = usersService.getByName(name);

  if (!entry || entry.length === 0)
    res
      .status(constants.HTTP_STATUS_NOT_FOUND)
      .send(STATUS_CODES[constants.HTTP_STATUS_NOT_FOUND]);

  res.send(entry);
};

// from teste1
const getUsers = (req, res, next) => {
  res.send(usersService.getAll());
};

// from teste2
const insertUser = (req, res) => {
  const name = req.body.name;
  const job = req.body.job;

  const newEntry = usersService.insertUser(name, job);
  if (!newEntry)
    res
      .status(constants.HTTP_STATUS_BAD_REQUEST)
      .send(STATUS_CODES[constants.HTTP_STATUS_BAD_REQUEST]);

  res.send(newEntry);
};

// from teste3
const deleteUser = (req, res) => {
  const name = req.query.name;

  const deletedEntry = usersService.deleteUserByName(name);
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

  const entry = usersService.updateUser(id, name, job);
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

  const readCount = usersService.getUserAccessByName(name);
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
