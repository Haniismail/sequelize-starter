"use strict";
import { Model } from "sequelize";
var Sequelize = require("sequelize");

export const enum RoleCode {
  SUPERADMIN = "superadmin",
  ADMIN = "admin",
  PARENT = "parent",
  CHILD = "child",
}

export interface RoleAttributes {
  code: string;
  status: boolean;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Role extends Model<RoleAttributes> implements RoleAttributes {
    code!: string;
    status!: boolean;

    static associate(models: any) {
      Role.hasOne(models.Admin, {
        foreignKey: "roleId",
      });
      Role.hasOne(models.parents, {
        foreignKey: "roleId",
      });
    }
  }
  Role.init(
    {
      code: {
        type: Sequelize.ENUM(
          RoleCode.ADMIN,
          RoleCode.SUPERADMIN,
          RoleCode.PARENT,
          RoleCode.CHILD
        ),
      },
      status: DataTypes.STRING,
    },

    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
