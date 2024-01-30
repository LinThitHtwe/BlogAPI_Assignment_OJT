const {
  addUser: addUserService,
  getUserByEmail: getUserByEmailService,
  getUserByUsername: getUserByUsernameService,
} = require("../services/user.service");
const { created, retrieved } = require("./base.controller");
const responseMessages = require("../constants/response.messages");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dbErrors = require("../errors/db.error");
const dbErrorMessages = require("../constants/db.error");
const role = require("../constants/role");
const verifyRole = require("./verifyRole");
const appErrors = require("../constants/app.error");
const { userStatus } = require("../constants/status");

const registerUser = async (req, res, next) => {
  const userData = req.body;

  try {
    const currentLoginUser = verifyRole(req.header("Authorization"));
    if (
      (currentLoginUser &&
        currentLoginUser.role === role.user &&
        userData.role === role.admin) ||
      (!currentLoginUser && userData.role === role.admin)
    ) {
      throw dbErrors.unauthorizedError(dbErrorMessages.unauthorized);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const result = await addUserService({
      ...userData,
      password: hashedPassword,
    });
    const token =
      userData.role === role.admin
        ? null
        : jwt.sign({ user: result }, process.env.SECRET_KEY, {
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
      throw dbErrors.itemNotFoundError(appErrors.emailNotExist);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw dbErrors.unauthorizedError(appErrors.incorrectPassword);
    }

    if (user.status == userStatus.suspended) {
      console.log("suspended");
      throw dbErrors.suspendedError(appErrors.accountSuspended);
    }
    const token = jwt.sign({ user }, process.env.SECRET_KEY, {
      expiresIn: "30d",
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

const generateToken = () => {};

module.exports = {
  registerUser,
  loginUser,
};
