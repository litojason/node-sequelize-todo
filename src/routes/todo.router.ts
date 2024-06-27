import { Router } from "express";

import { isAuthenticated } from "../middlewares/authentication";
import * as todoController from "../controllers/todo.controller";

const todoRouter = Router();

todoRouter.get("/", isAuthenticated, todoController.getTodo);
todoRouter.get("/:id", isAuthenticated, todoController.getTodoById);
todoRouter.post("/", isAuthenticated, todoController.postTodo);
todoRouter.put("/:id", isAuthenticated, todoController.updateTodo);
todoRouter.delete("/:id", isAuthenticated, todoController.deleteTodo);

export default todoRouter;
