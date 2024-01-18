const authenticateToken = require("../middleware/verifyJwt");
const {
  getUserById,
  updateUser,
  deleteUser,
} = require("../controller/user.controller");
const userRoutes = require("../routes/user");
const router = require("express").Router();

router.get(userRoutes.getUserById, getUserById);
router.put(userRoutes.updateUser, authenticateToken, updateUser);
router.put(userRoutes.deleteUser, authenticateToken, deleteUser);
module.exports = router;
