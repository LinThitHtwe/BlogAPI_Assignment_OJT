const User = require("../models/user.model");
const dbError = require("../errors/db.error");
const dbErrorMessages = require("../constants/db.error");
const { checkId } = require("./base.service");

const addUser = async (userData) => {
  const user = new User(userData);
  try {
    const result = await user.save();
    return result;
  } catch (error) {
    if (error.code === 11000) {
      throw dbError.alreadyExistsError(dbErrorMessages.alreadyExistsError);
    }
    throw dbError.unprocessableError(dbErrorMessages.unprocessable);
  }
};

const getUserByEmail = async (email) => {
  try {
    const result = await User.findOne({ email });
    return result ? result : null;
  } catch (error) {
    throw dbError.unprocessableError(dbErrorMessages.unprocessable);
  }
};

const getUserById = async (userId) => {
  try {
    await checkId(userId, User, dbErrorMessages.itemNotFound);
    const result = await User.findById(userId);
    return result;
  } catch (error) {
    if (error.name === dbErrorMessages.itemNotFound) {
      throw dbError.itemNotFoundError(dbErrorMessages.itemNotFound);
    }
    throw dbError.unprocessableError(dbErrorMessages.unprocessable);
  }
};

module.exports = {
  addUser,
  getUserByEmail,
  getUserById,
};
