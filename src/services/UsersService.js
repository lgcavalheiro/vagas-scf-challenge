const UsersDB = require("../fakeData");

validateUserFields = (name, job) => {
  return !name || !job || name.trim().length === 0 || job.trim().length === 0;
};

getAll = () => {
  return UsersDB.getAll();
};

getByName = (name) => {
  if (!name || name.trim().length === 0) return;

  return UsersDB.getByName(name);
};

insertUser = (name, job) => {
  if (validateUserFields(name, job)) return;

  return UsersDB.insertEntry(name, job);
};

updateUser = (id, name, job) => {
  if (!Number.isInteger(id) || id < 0) return;

  // TODO: Update so controller can know validation failed instead of "not found"
  if (validateUserFields(name, job)) return;

  return UsersDB.updateEntry(id, name, job);
};

deleteUserByName = (name) => {
  // TODO: account for something other than string
  if (!name || name.trim().length === 0) return;

  return UsersDB.deleteByName(name);
};

getUserAccessByName = (name) => {
  // TODO: DRY this
  if (!name || name.trim().length === 0) return;

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
