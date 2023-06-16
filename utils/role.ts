import { RoleRequest } from "app-request";
import { Response, NextFunction } from "express";
import { RoleCode } from "../database/models/role";

export default (roleCode: RoleCode) =>
  (req: RoleRequest, res: Response, next: NextFunction) => {
    //assign the restricted Role to roleCode
    req.currentRoleCode = roleCode;
    next();
  };
