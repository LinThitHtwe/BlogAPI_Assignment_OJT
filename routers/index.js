const router = require("express").Router();
const userRoutes = require("./user");
const categoryRoutes = require("./category");
const autRoutes = require("./auth");
const blogRoutes = require("./blog");

router.use("/user", userRoutes);
router.use("/category", categoryRoutes);
router.use("/auth", autRoutes);
router.use("/blog", blogRoutes);

module.exports = router;
