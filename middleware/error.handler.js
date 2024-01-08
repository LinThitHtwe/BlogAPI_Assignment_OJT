const errorNameConstant = require("../constants/db.error");
const responseStatus = require("../constants/response.status");

exports.handler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  switch ((err, name)) {
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
        message: "404 not found",
        data: null,
      });
  }
};
