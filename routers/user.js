const authenticateToken = require("../middleware/verifyJwt");
const { getUserById, updateUser } = require("../controller/user.controller");
const userRoutes = require("../routes/user");
const router = require("express").Router();

router.get(userRoutes.getUserById, authenticateToken, getUserById);
router.get(userRoutes.updateUser, updateUser);
module.exports = router;
