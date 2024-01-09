const appErrorsMessages = require("../constants/app.error");

exports.forbidden = (name) => {
  let err = new Error(name);
  err.name = appErrorsMessages.forbidden;
  return err;
};
