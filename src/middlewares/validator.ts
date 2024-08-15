import { NextFunction, Request, Response } from "express";
import { Schema, ValidationError } from "yup";

import { CustomError } from "./errors";

export const validateRequest = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });

      return next();
    } catch (error) {
      const e = new ValidationError(error);
      const errors = e.inner.reduce(
        (prev, current) => ({ ...prev, [current.path]: current.message }),
        {}
      );
      next(new CustomError(400, error.errors[0], errors));
    }
  };
};
