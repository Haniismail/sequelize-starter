const { Role } = require("../database/models");
import RoleRepo from "../database/repositories/RoleRepo";
import asyncHandler from "../utils/asyncHandler";
import express from "express";
import { InternalErrorResponse } from "../core/ApiResponse";

const router = express.Router();

export default router.use(
  asyncHandler(async (req: any, res, next) => {
    /************** conditions where the access will be denied **************/

    //get the role id of the current Connected user from the token
    //req.user.roleId is extracted from the token
    const currentRoleId = await Role.findOne({
      where: { id: req.user.roleId },
    });
    // get the role code of the connected user
    const currentRoleCode = currentRoleId.code;

    /************** CONDITION 1 : if the user has an invalid role throw an error **************/
    if (!req.user || !currentRoleId || !currentRoleCode) {
      return next(
        new InternalErrorResponse("Some elements of the user are missing").send(
          res
        )
      );
    }

    //get the restricted Role found in the routes
    const role = await RoleRepo.findByCode(req.currentRoleCode);

    /************** CONDITION 2 : if the restricted role doesn't exist throw an error **************/
    if (!role) {
      return next(
        new InternalErrorResponse(
          "the user doesn't seem to have an assigned role"
        ).send(res)
      );
    }
    /************** CONDITION 3 : if the current user's role and the restricted role are different throw an error **************/
    if (req.currentRoleCode != currentRoleCode) {
      return next(
        new InternalErrorResponse(
          `a user with role ${currentRoleCode} doesn't have permission to conduct an action authorized for ${req.currentRoleCode}`
        ).send(res)
      );
    }
    // get validRoles from the current user's role id
    const validRoles = currentRoleId;

    // if the user's entered an empty role or doesn't exist throw an error
    if (!validRoles || validRoles.length == 0) {
      return next(
        new InternalErrorResponse(
          "YOU DONT HAVE PERMISSION FOR THIS ACTION"
        ).send(res)
      );
    }
    return next();
  })
);
