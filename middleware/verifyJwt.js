const jwt = require("jsonwebtoken");
require("dotenv").config();
const appErrors = require("../errors/app.error");
const appErrorsMessages = require("../constants/app.error");
const dbError = require("../errors/db.error");
const dbErrorMessages = require("../constants/db.error");

function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    throw dbError.unauthorizedError(dbErrorMessages.unauthorized);
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      throw appErrors.forbidden(appErrorsMessages.forbidden);
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
