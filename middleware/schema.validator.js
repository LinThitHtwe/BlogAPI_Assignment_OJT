const schemas = require("../validators/validate");
const statusName = require("../constants/response.status");
const dbError = require("../errors/db.error");
const dbErrorMessages = require("../constants/db.error");
const supportedMethods = ["post", "put", "delete", "patch"];

const validationOptions = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: false,
};

const schemaValidator = (path, useJoiError = true) => {
  const schema = schemas[path];
  if (!schema) {
    throw new Error(`Schema ${path} not found`);
  }
  return (req, res, next) => {
    const method = req.method.toLowerCase();
    if (!supportedMethods.includes(method)) {
      return next();
    }
    const { error, value } = schema.validate(req.body, validationOptions);
    if (error) {
      const customError = {
        status: statusName.fail,
        error: "Invalid request. Please review request and try again.",
      };
      const joiError = {
        status: statusName.fail,
        error: {
          original: error._original,
          details: error.details.map(({ message, type }) => ({
            message: message.replace(/['"]/g, ""),
            type,
          })),
        },
      };
      console.log("JOI error------", joiError);
      return res.status(422).json(useJoiError ? joiError : customError);
      //throw dbError.unprocessableError(dbErrorMessages.unprocessable)
    }
    req.body = value;
    return next();
  };
};

module.exports = { schemaValidator };
