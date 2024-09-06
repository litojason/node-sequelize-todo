import dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const {
  HOST,
  PORT,
  NODE_ENV,
  JWT_SECRET_KEY,
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_HOST,
  DB_DIALECT,
} = process.env;

export {
  HOST,
  PORT,
  NODE_ENV,
  JWT_SECRET_KEY,
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_HOST,
  DB_DIALECT,
};
