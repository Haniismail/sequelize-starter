import express from "express";
import JWT from "../core/JWT";
import KeystoreRepo from "../database/repositories/KeystoreRepo";
import { getAccessToken, getRepo, validateTokenData } from "./authUtils";
import validator, { ValidationSource } from "../utils/validator";
import schema from "./schema";
import asyncHandler from "../utils/asyncHandler";
import {
  AccessTokenErrorResponse,
  NotFoundResponse,
} from "../core/ApiResponse";
import { TokenExpiredError } from "../core/appError";
const router = express.Router();
export default router.use(
  //validates the type to be matching bearer token
  validator(schema.auth, ValidationSource.HEADER),

  asyncHandler(async (req: any, res, next) => {
    //gain access to the access token
    // Express headers are auto converted to lowercase
    req.accessToken = getAccessToken(req.headers.authorization);
  
    try {
      //gain access to payload through the token
      const payload = await JWT.validate(req.accessToken, res);

      //validate the payload through the validateTokenData() function
      validateTokenData(payload);
      //signed in user's id is extracted from token as payload.sub
      //we search for the signed in user to make sure they are registered
      //we map across the someObj to extract eahch object that contains {Model }
      let role = payload?.role
      let user = await getRepo(role).findOne({
        //query refers to the array containing the condition now
        where: {
          id: payload.sub,
        },
      });

      //throw error if user is not registered
      if (!user) throw new NotFoundResponse("User not registered").send(res);

      // //const user = req.user from the token is the current connected user
      req.user = user;

      //find the keystore that has connected user's ID and primary key as payload.prm
      const keystore = await KeystoreRepo.findforKey(req.user.id, payload.prm);

      //throw error if no such keystore exist
      if (!keystore)
        throw new AccessTokenErrorResponse("Invalid access token").send(res);

      //const keystore = req.keystore from the token is the current connected user's keystore
      req.keystore = keystore;

      return next();
    } catch (error: any) {
      //catch error if found
      if (error instanceof TokenExpiredError)
        throw new AccessTokenErrorResponse("Access Token Error").send(res);
      // throw e;
    }
  })
);

module.exports = router;
