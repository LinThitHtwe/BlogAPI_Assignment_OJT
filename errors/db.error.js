const dbErrorMessages = require("../constants/db.error");

exports.itemNotFoundError = (name) => {
  let err = new Error(name);
  err.name = dbErrorMessages.itemNotFoundError;
  return err;
};

exports.unauthorizedError = (name) => {
  let err = new Error(name);
  err.name = dbErrorMessages.unauthorizedError();
  return err;
};
