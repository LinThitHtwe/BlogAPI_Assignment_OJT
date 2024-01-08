const User = require("../models/user.model");
const dbError = require("../errors/db.error");
const dbErrorMessages = require("../constants/db.error");

const addUser = async (userData) => {
  const user = new User(userData);
  try {
    const result = await user.save();
    return result;
  } catch (error) {
    throw dbError.unprocessableError(dbErrorMessages.unprocessable);
  }
};

const getUserByEmail = async (email) => {
  try {
    const result = await User.findOne({ email });
    if (!result) {
      return null;
    }

    return result;
  } catch (error) {
    console.error("Error in getUserByEmail:", error);
    throw dbError.unprocessableError(dbErrorMessages.unprocessable);
  }
};

module.exports = {
  addUser,
  getUserByEmail,
};
