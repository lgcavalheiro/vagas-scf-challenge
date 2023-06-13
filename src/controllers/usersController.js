const usersService = require("../services/usersService");
const { STATUS_CODES } = require("http");
const { constants } = require("http2");

// from teste1
const getUser = (req, res, next) => {
  const name = req.query.name;

  const entry = usersService.getByName(name);

  if (entry.length === 0) {
    res
      .status(constants.HTTP_STATUS_NOT_FOUND)
      .json(STATUS_CODES[constants.HTTP_STATUS_NOT_FOUND]);
    return;
  }

  if (entry.errors) res.status(constants.HTTP_STATUS_BAD_REQUEST);

  res.json(entry);
};

// from teste1
const getUsers = (req, res, next) => {
  res.json(usersService.getAll());
};

// from teste2
const insertUser = (req, res) => {
  const name = req.body.name;
  const job = req.body.job;

  const newEntry = usersService.insertUser(name, job);
  if (newEntry.errors) res.status(constants.HTTP_STATUS_BAD_REQUEST);

  res.json(newEntry);
};

// from teste3
const deleteUser = (req, res) => {
  const name = req.query.name;

  const result = usersService.deleteUserByName(name);
  if (!result) {
    res
      .status(constants.HTTP_STATUS_NOT_FOUND)
      .json(STATUS_CODES[constants.HTTP_STATUS_NOT_FOUND]);
    return;
  }

  if (result.errors) {
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(result);
    return;
  }

  res.json(STATUS_CODES[constants.HTTP_STATUS_OK]);
};

// from teste4
const updateUser = (req, res) => {
  const id = Number.parseInt(req.query.id, 10);
  const name = req.body.name;
  const job = req.body.job;

  const entry = usersService.updateUser(id, name, job);
  if (!entry) {
    res
      .status(constants.HTTP_STATUS_NOT_FOUND)
      .json(STATUS_CODES[constants.HTTP_STATUS_NOT_FOUND]);
    return;
  }

  if (entry.errors) res.status(constants.HTTP_STATUS_BAD_REQUEST);

  res.json(entry);
};

// from teste5
const getUserAccess = (req, res) => {
  const name = req.query.name;

  const readCount = usersService.getUserAccessByName(name);
  if (!readCount) {
    res
      .status(constants.HTTP_STATUS_NOT_FOUND)
      .json(STATUS_CODES[constants.HTTP_STATUS_NOT_FOUND]);
    return;
  }

  if (readCount.errors) {
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(readCount);
    return;
  }

  res.json(`Usuário ${name} foi lido ${readCount} vez(es).`);
};

module.exports = {
  getUser,
  getUsers,
  insertUser,
  deleteUser,
  updateUser,
  getUserAccess,
};
