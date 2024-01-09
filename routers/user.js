const authenticateToken = require("../middleware/verifyJwt");
const { getUserById } = require("../controller/user.controller");
const userRoutes = require("../routes/user");
const router = require("express").Router();

router.get(userRoutes.getUserById, authenticateToken, getUserById);

module.exports = router;
