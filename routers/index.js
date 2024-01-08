const router = require("express").Router();
const userRoutes = require("./user");
const categoryRoutes = require("./category");
const autRoutes = require("./auth");

router.use("/user", userRoutes);
router.use("/category", categoryRoutes);
router.use("/auth", autRoutes);

module.exports = router;
