"use strict";
import { Model } from "sequelize";

export default interface AdminAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  roleId: string;
  birthday: Date;
  firstname: string;
  lastName: string;
  photo: string;
  website: string;
  biography: string;
  gender: string;
  local: string;
  timezone: string;
  phone: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Admin extends Model<AdminAttributes> implements AdminAttributes {
    id!: number;
    username!: string;
    email!: string;
    password!: string;
    roleId!: string;
    birthday!: Date;
    firstname!: string;
    lastName!: string;
    photo!: string;
    website!: string;
    biography!: string;
    gender!: string;
    local!: string;
    timezone!: string;
    phone!: number;

    static associate(models: any) {
      Admin.belongsTo(models.Role, {
        foreignKey: "roleId",
      });
    }
  }
  Admin.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
      },
      roleId: DataTypes.INTEGER,
      birthday: DataTypes.DATE,
      firstname: DataTypes.STRING,
      lastName: DataTypes.STRING,
      photo: DataTypes.STRING,
      website: DataTypes.STRING,
      biography: DataTypes.STRING,
      gender: DataTypes.STRING,
      local: DataTypes.STRING,
      timezone: DataTypes.STRING,
      phone: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Admin",
    }
  );
  return Admin;
};
