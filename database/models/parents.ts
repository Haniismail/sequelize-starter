"use strict";
import { Model } from "sequelize";

export interface ParentAttributes {
  id: number;
  name: string;
  last_name: string;
  email: string;
  address: string;
  phone_number: string;
  password: string;
  username: string;
  roleId: string;
  last_login_at: Date;
  password_requested_at: Date;
  verified: boolean;
  confirmed: boolean;
  confirmation_token: string;
  countries: string;
  smsattempt: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Parent extends Model<ParentAttributes> implements ParentAttributes {
    id!: number;
    name!: string;
    last_name!: string;
    email!: string;
    address!: string;
    password!: string;
    phone_number!: string;
    username!: string;
    roleId!: string;
    last_login_at!: Date;
    password_requested_at!: Date;
    verified!: boolean;
    confirmed!: boolean;
    confirmation_token!: string;
    countries!: string;
    smsattempt!: number;
  }
  Parent.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      last_login_at: DataTypes.DATE,
      password_requested_at: DataTypes.DATE,
      password: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      username: DataTypes.STRING,
      verified: DataTypes.BOOLEAN,
      confirmed: DataTypes.BOOLEAN,
      confirmation_token: DataTypes.STRING,
      countries: DataTypes.STRING,
      smsattempt: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: "parents",
      freezeTableName: true,
    }
  );
  return Parent;
};
