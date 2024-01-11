const dbErrorMessages = require("../constants/db.error");

exports.itemNotFoundError = (name) => {
  let err = new Error(name);
  err.name = dbErrorMessages.itemNotFound;
  return err;
};

exports.unauthorizedError = (name) => {
  let err = new Error(name);
  err.name = dbErrorMessages.unauthorized;
  return err;
};

exports.alreadyExistsError = (name) => {
  let err = new Error(name);
  err.name = dbErrorMessages.itemAlreadyExists;
  return err;
};

exports.invalidIdError = (key) => {
  let err = new Error(key);
  err.name = dbErrorMessages.invalidId;
  return err;
};

exports.unprocessableError = (name) => {
  let err = new Error(name);
  err.name = dbErrorMessages.unprocessable;
  return err;
};
