const errorNameConstant = require("../constants/db.error");
const responseStatus = require("../constants/response.status");
const appErrorsMessages = require("../constants/app.error");

exports.handler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  switch (err.name) {
    case errorNameConstant.invalidId:

    case errorNameConstant.invalid:
      res.status(400).json({
        status: responseStatus.fail,
        message: "invalid",
        data: null,
      });
      break;
    case errorNameConstant.itemNotFound:
      res.status(404).json({
        status: responseStatus.fail,
        message: errorNameConstant.itemNotFound,
        data: null,
      });
      break;

    case errorNameConstant.itemAlreadyExists:
      res.status(409).json({
        status: responseStatus.fail,
        message: errorNameConstant.itemAlreadyExists,
        data: null,
      });
      break;

    case errorNameConstant.unauthorized:
      res.status(401).json({
        status: responseStatus.fail,
        message: errorNameConstant.unauthorized,
        data: null,
      });
      break;

    case appErrorsMessages.forbidden:
      res.status(403).json({
        status: responseStatus.fail,
        message: appErrorsMessages.forbidden,
        data: null,
      });
      break;
  }

  // next();
};
