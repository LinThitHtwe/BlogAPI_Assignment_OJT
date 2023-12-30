const { getUserDetails } = require("../controller/user.controller");

const router = require("express").Router();

router.get("/me", getUserDetails);

module.exports = router;
