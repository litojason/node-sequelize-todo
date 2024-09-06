# Node Sequelize Todo

Todo API built with Typescript, Node JS, Express, MySQL, Sequelize.

## Example Project With This API

- React Native Todo List: [RNTodoList](https://github.com/litojason/RNTodoList)

## Additional Dependencies

Please refer to `package.json`.

- [bcryptjs](https://www.npmjs.com/package/bcryptjs): hash password
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): generate token
- [yup](https://www.npmjs.com/package/yup): validation
- [cors](https://www.npmjs.com/package/cors): enable CORS

## Installation

    git clone https://github.com/litojason/node-sequelize-todo.git

    cd node-sequelize-todo

    npm install

## Setup Env

Create 3 (or more) new files: `.env.development`, `.env.staging`, `.env.production`. Please copy example below or refer to `.env.sample` file.

    DB_HOST=127.0.0.1
    DB_NAME=db_name
    DB_USER=db_user
    DB_PASS=db_password
    DB_PORT=3306
    DB_DIALECT=mysql
    HOST=localhost
    PORT=3000
    NODE_ENV=development
    JWT_SECRET_KEY=secret_key

## Run

```bash
# Development environment
npm run dev

# Staging environment
npm run staging

# Production environment
npm run prod
```
