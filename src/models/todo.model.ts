import { DataTypes, Model, Optional } from "sequelize";

import { sequelize } from ".";

interface TodoAttributes {
  id: number;
  title: string;
  description: string;
  isCompleted?: boolean;
  userId: number;
}

export interface TodoCreationAttributes
  extends Optional<TodoAttributes, "id"> {}
export interface TodoOutput extends Required<TodoAttributes> {}

class Todo
  extends Model<TodoAttributes, TodoCreationAttributes>
  implements TodoAttributes
{
  public id!: number;
  public title!: string;
  public description!: string;
  public isCompleted!: boolean;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  static associate(models: any) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
    });
  }
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    modelName: "Todo",
    tableName: "todos",
    sequelize: sequelize,
    timestamps: true,
    paranoid: true,
  }
);

export default Todo;
