import { NextFunction, Request, Response } from "express";

// export enum HttpStatusCode {
//   OK = 200,
//   CREATED = 201,
//   BAD_REQUEST = 400,
//   UNAUTHORIZED = 401,
//   FORBIDDEN = 403,
//   NOT_FOUND = 404,
//   INTERNAL_SERVER = 500,
// }

export class CustomError extends Error {
  public readonly statusCode: number;
  public readonly errors?: Object;

  constructor(statusCode: number, message: string, errors?: Object) {
    // super(message);
    super();

    Object.setPrototypeOf(this, CustomError.prototype);

    this.statusCode = statusCode || 500;
    this.message = message || "Something went wrong. Please try again.";
    this.errors = errors || undefined;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("err", err);
  res.status(err.statusCode).json(err);
};
