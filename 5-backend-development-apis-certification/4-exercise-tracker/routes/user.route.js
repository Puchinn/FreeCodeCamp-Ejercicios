const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/user.controller");

userRouter.get("/", userController.findUsers);
userRouter.post("/", userController.create);
userRouter.post("/:id/exercises", userController.addExercise);
userRouter.get("/:id/logs", userController.log);

module.exports = userRouter;
