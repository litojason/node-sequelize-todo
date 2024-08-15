import { Router } from "express";

import * as userController from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/authentication";
import {
  validateChangePassword,
  validateEditProfile,
  validateLogin,
  validateRegister,
} from "../validators/user.validator";

const userRouter = Router();

userRouter.get("/", userController.getAllUsers);
userRouter.post("/register", validateRegister, userController.postUser);
userRouter.post("/login", validateLogin, userController.postLogin);

userRouter.get("/profile", isAuthenticated, userController.getProfile);
userRouter.put(
  "/profile",
  isAuthenticated,
  validateEditProfile,
  userController.editProfile
);
userRouter.put(
  "/profile/password",
  isAuthenticated,
  validateChangePassword,
  userController.changePassword
);

export default userRouter;
