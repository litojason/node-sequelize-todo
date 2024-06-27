import { Sequelize } from "sequelize";

const { NODE_ENV } = process.env;

const env = NODE_ENV || "development";
const config = require(__dirname + "/../config/database.ts")[env];

const sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, {
      dialect: config.dialect,
      host: config.host,
    });

export { Sequelize, sequelize };
