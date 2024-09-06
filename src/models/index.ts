import { Dialect, Sequelize } from "sequelize";
import { DB_DIALECT, DB_HOST, DB_NAME, DB_PASS, DB_USER } from "../config/env";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  dialect: (DB_DIALECT as Dialect) || "mysql",
  host: DB_HOST,
});

export { Sequelize, sequelize };
