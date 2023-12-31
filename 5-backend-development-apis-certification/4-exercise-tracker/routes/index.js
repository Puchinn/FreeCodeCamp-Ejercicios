const { Router } = require("express");
const appRoutes = Router();

const userRoutes = require("../routes/user.route");

appRoutes.use("/api/users", userRoutes);

module.exports = appRoutes;
