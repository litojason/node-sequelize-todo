import { NextFunction, Request, Response } from "express";

import { verifyToken } from "../lib/jwt";

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

  if (!prefix || prefix !== "Bearer")
    return res.status(401).json({ message: "No bearer prefix found." });
  if (!token) return res.status(401).json({ message: "Token not found." });

  try {
    const decoded = verifyToken(token) as { id: number; email: string };
    if (!decoded) return res.status(400).json({ message: "Token is invalid!" });

    if (decoded) {
      req.userId = decoded.id;
    }
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
