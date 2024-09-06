import express from "express";
import cors from "cors";

import { PORT } from "./src/config/env";
import { sequelize } from "./src/models";
import indexRouter from "./src/routes/index.router";
import userRouter from "./src/routes/user.router";
import todoRouter from "./src/routes/todo.router";
import { errorHandler } from "./src/middlewares/errors";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", indexRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/todos", todoRouter);

app.use(errorHandler);

sequelize
  .sync({
    // force: true,
    // alter: true,
  })
  .then(() => {
    console.log("Connection has been established successfully.");

    app.listen(PORT, () => {
      console.log(`[server]: Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
