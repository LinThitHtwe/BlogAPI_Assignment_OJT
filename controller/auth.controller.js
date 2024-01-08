const {
  addUser: addUserService,
  getUserByEmail: getUserByEmailService,
} = require("../services/user.service");
const { created, retrieved } = require("./base.controller");
const responseMessages = require("../constants/response.messages");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dbErrors = require("../errors/db.error");
const dbErrorMessages = require("../constants/db.error");

const registerUser = async (req, res, next) => {
  const userData = req.body;
  try {
    const existingUser = await getUserByEmailService(userData.email);
    if (existingUser) {
      throw dbErrors.alreadyExistsError(dbErrorMessages.itemAlreadyExists);
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const result = await addUserService({
      ...userData,
      password: hashedPassword,
    });

    const token = jwt.sign({ user: result }, process.env.SECRET_KEY, {
      expiresIn: "25s",
    });

    return created(res, `Account ${responseMessages.successfullyCreated}`, {
      user: result,
      token,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmailService(email);
    if (!user) {
      throw dbErrors.itemNotFoundError(dbErrorMessages.itemNotFound);
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch);
    if (!passwordMatch) {
      throw dbErrors.unauthorizedError(dbErrorMessages.unauthorized);
    }
    const token = jwt.sign({ user }, process.env.SECRET_KEY, {
      expiresIn: "25s",
    });
    retrieved(res, `User ${responseMessages.retrievedSuccessfully}`, {
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
