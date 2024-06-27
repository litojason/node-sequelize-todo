import express from "express";

const indexRouter = express.Router();

indexRouter.get("/", function (req, res, next) {
  res.send("Welcome to node-todo-sequelize api!");
});

export default indexRouter;
