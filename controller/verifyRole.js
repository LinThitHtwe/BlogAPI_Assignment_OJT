const jwt = require("jsonwebtoken");
require("dotenv").config();
const appErrors = require("../errors/app.error");
const appErrorsMessages = require("../constants/app.error");
const dbError = require("../errors/db.error");
const dbErrorMessages = require("../constants/db.error");

function verifyRole(req) {
  const token = req.header("Authorization")?.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded.user;
  } catch (err) {
    return undefined;
  }
}

module.exports = verifyRole;
