import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/user.model";
import { RequestWithUser, generateToken } from "../middlewares/authentication";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();

    return res.status(200).json({ users });
  } catch (error) {
    console.log("getAllUsers error", error);
    return res.status(500).json({ message: error });
  }
};

export const postUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name) return res.status(400).json({ message: "Name is required." });
    if (!email) return res.status(400).json({ message: "Email is required." });
    if (!password)
      return res.status(400).json({ message: "Password is required." });

    const existedUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (existedUser) {
      return res
        .status(400)
        .json({ message: "Email is already registered before." });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

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
    console.log("postUser error", error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const postLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required." });
    if (!password)
      return res.status(400).json({ message: "Password is required." });

    const user = await User.scope("withPassword").findOne({
      where: { email },
      raw: true,
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Email or password is not valid." });
    }

    // Verify Password
    if (!bcrypt.compareSync(password, user.password)) {
      return res
        .status(401)
        .json({ message: "Email or password is not valid." });
    }

    const token = generateToken(user);

    return res.status(200).json({
      message: "Login successfull.",
      user: { ...user, token, password: undefined },
    });
  } catch (error) {
    console.log("postLogin error", error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const getProfile = async (req: RequestWithUser, res: Response) => {
  try {
    const { userId } = req;

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.log("getProfile error", error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const editProfile = async (req: RequestWithUser, res: Response) => {
  try {
    const { userId } = req;
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: "Name is required." });

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const updatedUser = await user.update({ name });

    return res
      .status(201)
      .json({ message: "Edit Profile Success!", user: updatedUser });
  } catch (error) {
    console.log("editProfile error", error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const changePassword = async (req: RequestWithUser, res: Response) => {
  try {
    const { userId } = req;
    const { password, newPassword } = req.body;

    if (!password)
      return res.status(400).json({ message: "Password is required." });
    if (!newPassword)
      return res.status(400).json({ message: "New password is required." });

    const user = await User.scope("withPassword").findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Password invalid." });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    const updatedUser = await user.update({ password: hashedPassword });

    updatedUser.password = undefined;

    return res.status(201).json({
      message: "Change Password Success!",
      user: updatedUser,
    });
  } catch (error) {
    console.log("changePassword error", error);
    return res.status(500).json({ message: "Server error." });
  }
};
