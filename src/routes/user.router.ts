import { Router } from "express";

import * as userController from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/authentication";

const userRouter = Router();

userRouter.get("/", userController.getAllUsers);
userRouter.post("/register", userController.postUser);
userRouter.post("/login", userController.postLogin);

userRouter.get("/profile", isAuthenticated, userController.getProfile);
userRouter.put("/profile", isAuthenticated, userController.editProfile);
userRouter.put(
  "/profile/password",
  isAuthenticated,
  userController.changePassword
);

export default userRouter;
