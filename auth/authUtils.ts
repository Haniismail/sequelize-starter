import { Tokens } from "app-request";
import {
  AccessTokenError,
  AuthFailureError,
  TokenExpiredError,
} from "../core/appError";
import JWT, { JwtPayload } from "../core/JWT";
import { tokenInfo } from "../config";
import * as dotenv from "dotenv";
import AdminRepo from "../database/repositories/AdminRepo";
import ParentRepo from "../database/repositories/parentRepository";
import ProvisionalAttributes from "ProvisionalAttributes";

dotenv.config();

export const getAccessToken = (authorization?: string) => {
  if (!authorization) throw new AuthFailureError("Invalid Authorization");
  if (!authorization.startsWith("Bearer "))
    throw new AuthFailureError("Invalid Authorization");
  return authorization.split(" ")[1];
};

export const validateTokenData = (payload: JwtPayload): boolean => {
  if (
    !payload ||
    !payload.iss ||
    !payload.sub ||
    !payload.aud ||
    !payload.prm ||
    !payload.role ||
    payload.iss !== tokenInfo.issuer ||
    payload.aud !== tokenInfo.audience
    // !INTEGER.parseInt(payload.sub)
  )
    throw new AuthFailureError("Invalid Access Token");
  return true;
};

export const createTokens = async (
  user: ProvisionalAttributes, //new interface
  accessTokenKey: string,
  refreshTokenKey: string,
  role: string
): Promise<Tokens> => {
  const accessToken = await JWT.encode(
    new JwtPayload(
      tokenInfo.issuer,
      tokenInfo.audience,
      user.id,
      accessTokenKey,
      tokenInfo.accessTokenValidityDays,
      role
    )
  );

  if (!accessToken) throw new AccessTokenError("Invalid Authorization");

  const refreshToken = await JWT.encode(
    new JwtPayload(
      tokenInfo.issuer,
      tokenInfo.audience,
      user.id,
      refreshTokenKey,
      tokenInfo.refreshTokenValidityDays,
      role
    )
  );

  if (!refreshToken) throw new TokenExpiredError("Invalid Authorization");

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  } as Tokens;
};

export enum roleEnum {
  ADMIN = "admin",
  PARENT = "parent",
}

export const getRepo = (role: string) => {
  switch (role) {
    case roleEnum.ADMIN: {
      return AdminRepo;
    }
    case roleEnum.PARENT: {
      return ParentRepo;
    }

    default: {
      throw new AuthFailureError("Role is not defined");
    }
  }
};
