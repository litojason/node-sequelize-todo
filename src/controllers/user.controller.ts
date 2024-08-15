import { NextFunction, Request, Response } from "express";

import { hashPassword, validatePassword } from "../lib/bcryptjs";
import { generateToken } from "../lib/jwt";
import { RequestWithUser } from "../middlewares/authentication";
import { CustomError } from "../middlewares/errors";
import User from "../models/user.model";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.findAll();

    return res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

export const postUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    const existedUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (existedUser)
      throw new CustomError(400, "Email is already registered before.");

    const hashedPassword = hashPassword(password);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    newUser.password = undefined;

    return res.status(201).json({
      message: "User has been successfully registered!",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const postLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await User.scope("withPassword").findOne({
      where: { email },
      raw: true,
    });

    if (!user) throw new CustomError(401, "Email or password is not valid.");

    // Verify Password
    if (!validatePassword(password, user.password)) {
      throw new CustomError(401, "Email or password is not valid.");
    }

    const token = generateToken(user);

    user.password = undefined;

    return res.status(200).json({
      message: "Login successfull.",
      user: { ...user, token },
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req;

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) throw new CustomError(404, "User not found.");

    return res.status(200).json({
      message: "Get profile successful.",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const editProfile = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req;
    const { name } = req.body;

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) throw new CustomError(404, "User not found.");

    const updatedUser = await user.update({ name });

    return res.status(200).json({
      message: "Edit profile successful.",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req;
    const { currentPassword, newPassword } = req.body;

    const user = await User.scope("withPassword").findOne({
      where: {
        id: userId,
      },
    });

    if (!user) throw new CustomError(404, "User not found.");

    if (!validatePassword(currentPassword, user.password)) {
      throw new CustomError(401, "Password invalid.");
    }

    const hashedPassword = hashPassword(newPassword);

    const updatedUser = await user.update({ password: hashedPassword });

    updatedUser.password = undefined;

    return res.status(200).json({
      message: "Change password successful.",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
