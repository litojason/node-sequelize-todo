import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { UserOutput } from "../models/user.model";

export const generateToken = (user: UserOutput) => {
  return jwt.sign(user.id.toString(), process.env.JWT_SECRET_KEY!);
};

export interface RequestWithUser extends Request {
  userId: number;
}
export const isAuthenticated = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return res.status(401).json({ message: "Unathorized." });

  const [prefix, token] = authHeader.split(" ");

  if (!prefix)
    return res.status(401).json({ message: "No bearer prefix found." });
  if (!token) return res.status(401).json({ message: "Token not found." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    if (!decoded) return res.status(400).json({ message: "Token is invalid!" });

    if (decoded) {
      req.userId = Number(decoded);
    }
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
