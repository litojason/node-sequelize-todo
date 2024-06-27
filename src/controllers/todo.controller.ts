import { Response } from "express";

import Todo from "../models/todo.model";
import { RequestWithUser } from "../middlewares/authentication";

export const getTodo = async (req: RequestWithUser, res: Response) => {
  try {
    const { userId } = req;

    const todos = await Todo.findAll({ where: { userId } });

    return res.status(200).json({ todos });
  } catch (error) {
    console.log("getTodo err", error);
    return res.status(500).json({ message: error });
  }
};

export const getTodoById = async (req: RequestWithUser, res: Response) => {
  try {
    const { userId } = req;
    const { id } = req.params;

    const todo = await Todo.findOne({ where: { id } });

    if (!todo) return res.status(404).json({ message: "Todo not found." });
    if (todo.userId !== userId)
      return res
        .status(403)
        .json({ message: "Forbidden to retrieve other user todo." });

    return res.status(200).json({ todo });
  } catch (error) {
    console.log("getTodoById err", error);
    return res.status(500).json({ message: error });
  }
};

export const postTodo = async (req: RequestWithUser, res: Response) => {
  try {
    const { userId } = req;
    const { title, description, isCompleted } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required." });
    if (!description)
      return res.status(400).json({ message: "Description is required." });

    const todo = await Todo.create({ title, description, isCompleted, userId });

    return res.status(201).json({ todo });
  } catch (error) {
    console.log("postTodo err", error);
    return res.status(500).json({ message: error });
  }
};

export const updateTodo = async (req: RequestWithUser, res: Response) => {
  try {
    const { userId } = req;
    const { title, description, isCompleted } = req.body;
    const { id } = req.params;

    if (!title) return res.status(400).json({ message: "Title is required." });
    if (!description)
      return res.status(400).json({ message: "Description is required." });

    const todo = await Todo.findOne({ where: { id } });

    if (!todo) return res.status(404).json({ message: "Todo not found." });
    if (todo.userId !== userId)
      return res
        .status(403)
        .json({ message: "Forbidden to retrieve other user todo." });

    const updatedTodo = await todo.update({ title, description, isCompleted });

    return res
      .status(201)
      .json({ message: "Update Todo Success!", todo: updatedTodo });
  } catch (error) {
    console.log("updateTodo err", error);
    return res.status(500).json({ message: error });
  }
};

export const deleteTodo = async (req: RequestWithUser, res: Response) => {
  try {
    const { userId } = req;
    const { id } = req.params;

    const todo = await Todo.findOne({ where: { id } });

    if (!todo) return res.status(404).json({ message: "Todo not found." });
    if (todo.userId !== userId)
      return res
        .status(403)
        .json({ message: "Forbidden to retrieve other user todo." });

    await todo.destroy();

    return res
      .status(201)
      .json({ message: `Successfully delete todo with id ${id}` });
  } catch (error) {
    console.log("deleteTodo err", error);
    return res.status(500).json({ message: error });
  }
};
