import { Router } from "express";

import { isAuthenticated } from "../middlewares/authentication";
import * as todoController from "../controllers/todo.controller";
import { validateTodo } from "../validators/todo.validator";

const todoRouter = Router();

todoRouter.get("/", isAuthenticated, todoController.getTodos);
todoRouter.get("/:id", isAuthenticated, todoController.getTodoById);
todoRouter.post("/", isAuthenticated, validateTodo, todoController.postTodo);
todoRouter.put(
  "/:id",
  isAuthenticated,
  validateTodo,
  todoController.updateTodo
);
todoRouter.delete("/:id", isAuthenticated, todoController.deleteTodo);

export default todoRouter;
