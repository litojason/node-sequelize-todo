import { NextFunction, Response } from "express";

import { RequestWithUser } from "../middlewares/authentication";
import { CustomError } from "../middlewares/errors";
import Todo from "../models/todo.model";

export const getTodos = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req;

    const todos = await Todo.findAll({ where: { userId } });

    return res.status(200).json({
      message: "Get todos successful.",
      todos,
    });
  } catch (error) {
    next(error);
  }
};

export const getTodoById = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req;
    const { id } = req.params;

    const todo = await Todo.findOne({ where: { id } });

    if (!todo) throw new CustomError(404, "Todo not found.");
    if (todo.userId !== userId)
      throw new CustomError(403, "Forbidden to retrieve other user todo.");

    return res.status(200).json({
      message: "Get todo by id successful.",
      todo,
    });
  } catch (error) {
    next(error);
  }
};

export const postTodo = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req;
    const { title, description, isCompleted } = req.body;

    const todo = await Todo.create({ title, description, isCompleted, userId });

    return res.status(201).json({
      message: "Create todo successful.",
      todo,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req;
    const { title, description, isCompleted } = req.body;
    const { id } = req.params;

    const todo = await Todo.findOne({ where: { id } });

    if (!todo) throw new CustomError(404, "Todo not found.");
    if (todo.userId !== userId)
      throw new CustomError(403, "Forbidden to update other user todo.");

    const updatedTodo = await todo.update({ title, description, isCompleted });

    return res.status(201).json({
      message: "Update todo successful.",
      todo: updatedTodo,
    });
  } catch (error) {
    next(error);
  }
};

export const completeTodo = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req;
    const { isCompleted } = req.body;
    const { id } = req.params;

    const todo = await Todo.findOne({ where: { id } });

    if (!todo) throw new CustomError(404, "Todo not found.");
    if (todo.userId !== userId)
      throw new CustomError(403, "Forbidden to complete other user todo.");

    const updatedTodo = await todo.update({ isCompleted });

    return res.status(201).json({
      message: "Complete todo successful.",
      todo: updatedTodo,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req;
    const { id } = req.params;

    const todo = await Todo.findOne({ where: { id } });

    if (!todo) throw new CustomError(404, "Todo not found.");
    if (todo.userId !== userId)
      throw new CustomError(403, "Forbidden to delete other user todo.");

    await todo.destroy();

    return res.status(201).json({
      message: `Successfully delete todo with id ${id}`,
    });
  } catch (error) {
    next(error);
  }
};
