//export {};
import { NextFunction, Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";
import AdminRepo from "../../database/repositories/AdminRepo";
import {
  createTokens,
  getAccessToken,
  roleEnum,
  validateTokenData,
} from "../../auth/authUtils";
import asyncHandler from "../../utils/asyncHandler";
import KeystoreRepo from "../../database/repositories/KeystoreRepo";
import {
  SuccessMsgResponse,
  SuccessResponse,
  BadRequestResponse,
  NotFoundResponse,
  InternalErrorResponse,
  AccessTokenErrorResponse,
} from "../../core/ApiResponse";
import { RoleCode } from "../../database/models/role";
import JWT from "../../core/JWT";
import AdminAttributes from "../../database/models/admin";
const { Role, Admin } = require("../../database/models");
const { Op } = require("sequelize");

//sign up
export const signup = asyncHandler(async (req: Request, res: Response) => {
  //extract role from the req.body
  let {
    username,
    role,
    email,
    birthday,
    firstname,
    last_name,
    website,
    gender,
    local,
    phone,
  } = req.body;

  const photo = req.file?.filename;
  //create access Token Key
  const accessTokenKey = crypto.randomBytes(64).toString("hex");

  //create refresh Token Key
  const refreshTokenKey = crypto.randomBytes(64).toString("hex");

  //create the password hash with cripto
  const passwordHash = await bcrypt.hash(req.body.password, 13);

  //will make sure there are no duplicate users
  const verifyInputs = await AdminRepo.findOne({
    where: {
      [Op.or]: [{ username: username }, { email: email }],
    },
  });
  if (verifyInputs) {
    throw new BadRequestResponse("Oups, username or email already in use");
  }

  // make the role in lowerstring
  const lowerCaseRole = role.toLowerCase();

  //validate the role of the user
  if (lowerCaseRole != RoleCode.ADMIN) {
    throw new BadRequestResponse(`The role ${role} is unauthorized !`).send(
      res
    );
  }

  //findRoleFromString will give us the role from Role entity if it exists, if it doesn't it will create Role entity with a code = entered role value of the entered role
  const adminRole = await Role.findOne({
    where: {
      code: role,
    },
  });

  //we push  roleId at the DB through Admin Repo

  const { admin: createdAdmin, keystore } = await AdminRepo.create(
    {
      username: username,
      roleId: adminRole.id,
      password: passwordHash,
      email: email,
      birthday: birthday,
      firstname: firstname,
      photo: photo!,
      last_name: last_name,
      website: website,
      gender: gender,
      local: local,
      phone: phone,
    } as any,
    accessTokenKey,
    refreshTokenKey
  );

  //create tokens
  const tokens = await createTokens(
    createdAdmin,
    keystore.primaryKey,
    keystore.secondaryKey,
    roleEnum.ADMIN
  );

  //return the admin data without password, the access and refresh tokens
  res.status(200).json({
    status: "success",
    data: {
      createdAdmin,
      tokens,
    },
  });
});

//update admin data
export const updateAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const admin = await AdminRepo.findOne({
      where: {
        id: id,
      },
      raw: true,
    });
    if (!admin) {
      return next(
        new NotFoundResponse("No Admin found with that ID!").send(res)
      );
    } else {
      //create the password hash with cripto
      const data = req.body;
      if (req.body.password) {
        data.password = await bcrypt.hash(req.body.password, 13);
      }

      await AdminRepo.update(data, { where: { id: id } }).catch((error: any) =>
        next(new InternalErrorResponse(error).send(res))
      );
      res.status(200).json({
        status: "success",
        message: "admin updated successfully",
      });
    }
  }
);

//signout
export const signout = asyncHandler(async (req: any, res) => {
  // removes the id from the keystore which renders the jwtoken unvalid
  await KeystoreRepo.remove(req.keystore.id);
  new SuccessMsgResponse("Logout success").send(res);
});

//sign in
export const signin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await AdminRepo.findOne({
      where: { username: req.body.username },
    });

    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "Username or password are incorrect",
      });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return new NotFoundResponse("Authentication failure").send(res);

    const accessTokenKey = crypto.randomBytes(64).toString("hex");
    const refreshTokenKey = crypto.randomBytes(64).toString("hex");

    await KeystoreRepo.create(user.id, accessTokenKey, refreshTokenKey);
    const tokens = await createTokens(
      user,
      accessTokenKey,
      refreshTokenKey,
      roleEnum.ADMIN
    );
    new SuccessResponse("Login Success", {
      tokens: tokens,
    }).send(res);
  }
);

//me
export const me = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    req.accessToken = getAccessToken(req.headers.authorization);
    const payload = await JWT.validate(req.accessToken, res);
    //validate the payload through the validateTokenData() function
    validateTokenData(payload);

    //signed in user's id is extracted from token as payload.sub
    //we search for the signed in user to make sure they are registered
    const user = await AdminRepo.findOne({
      where: {
        id: req.user.id,
      },
      raw: true,
    });
    if (!user) {
      throw new AccessTokenErrorResponse("Invalid token").send(res);
    }
    new SuccessResponse("Login Success", {
      user,
    }).send(res);
  }
);
