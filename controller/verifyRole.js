const jwt = require("jsonwebtoken");
require("dotenv").config();
const appErrors = require("../errors/app.error");
const appErrorsMessages = require("../constants/app.error");
const dbError = require("../errors/db.error");
const dbErrorMessages = require("../constants/db.error");

function verifyRole(token) {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded.user;
  } catch (err) {
    console.log("verify--", err);
    return undefined;
  }
}

module.exports = verifyRole;
