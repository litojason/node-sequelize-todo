import { DataTypes, Model, Optional } from "sequelize";

import { sequelize } from ".";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}
export interface UserOutput extends Required<UserAttributes> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  password!: string;

  readonly createdAt!: Date;
  readonly updatedAt!: Date;
  readonly deletedAt!: Date;

  static associate(models: any) {
    this.hasMany(models.Todo, {
      foreignKey: "userId",
    });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
    scopes: {
      withPassword: {
        attributes: { include: ["password"] },
      },
    },

    modelName: "User",
    tableName: "users",
    sequelize: sequelize,
    timestamps: true,
    paranoid: true,
  }
);

export default User;
