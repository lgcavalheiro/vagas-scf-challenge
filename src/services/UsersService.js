const UsersDB = require("../fakeData");
const {
  validateStringField,
  validateUserFields,
  validateIntField,
} = require("../utils/validation");

const getAll = () => {
  return UsersDB.getAll();
};

const getByName = (name) => {
  const error = validateStringField(name, "name");

  if (error) return { errors: [error] };

  return UsersDB.getByName(name);
};

const insertUser = (name, job) => {
  const errors = validateUserFields(name, job);

  if (errors.length > 0) return { errors };

  return UsersDB.insertEntry(name, job);
};

const updateUser = (id, name, job) => {
  const errors = [];

  const errorId = validateIntField(id, "id");
  if (errorId) errors.push(errorId);

  const errorFields = validateUserFields(name, job);
  if (errorFields.length > 0) errors.push(...errorFields);

  if (errors.length > 0) return { errors };

  return UsersDB.updateEntry(id, name, job);
};

const deleteUserByName = (name) => {
  const error = validateStringField(name, "name");

  if (error) return { errors: [error] };

  return UsersDB.deleteByName(name);
};

const getUserAccessByName = (name) => {
  const error = validateStringField(name, "name");

  if (error) return { errors: [error] };

  return UsersDB.getReadCountByName(name);
};

module.exports = {
  getAll,
  getByName,
  insertUser,
  updateUser,
  deleteUserByName,
  getUserAccessByName,
};
