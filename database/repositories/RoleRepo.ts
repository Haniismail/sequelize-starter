import { RoleAttributes } from "../models/role";
const { Role } = require("../models");

export default class RoleRepo {
  // vocabulary tip : restricted role is the role that can do a certain action
  //finds and returns the role with code = the restricted role

  public static async destroy(obj: Object): Promise<RoleAttributes | null> {
    return await Role.destroy(obj);
  }

  public static findByCode(code: string): Promise<RoleAttributes | null> {
    return Role.findOne({ where: { code: code } });
  }
}
