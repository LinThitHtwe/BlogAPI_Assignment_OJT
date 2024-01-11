const { registerUser, loginUser } = require("../controller/auth.controller");
const authRoute = require("../routes/auth");
const router = require("express").Router();
const { schemaValidator } = require("../middleware/schema.validator");

router.post(authRoute.register, schemaValidator("auth/register"), registerUser);
router.post(authRoute.login, loginUser);

module.exports = router;
