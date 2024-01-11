const authenticateToken = require("../middleware/verifyJwt");
const { getUserById, updateUser } = require("../controller/user.controller");
const userRoutes = require("../routes/user");
const router = require("express").Router();

router.get(userRoutes.getUserById, authenticateToken, getUserById);
router.put(userRoutes.updateUser, authenticateToken, updateUser);
module.exports = router;
