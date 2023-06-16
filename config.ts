import * as dotenv from "dotenv";
dotenv.config();

// Mapper for environment variables
export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;
export const baseUrl = process.env.BASE_URL;

export const tokenInfo = {
  //ACCESS_TOKEN_VALIDITY_DAYS instead of sec
  accessTokenValidityDays: parseInt(
    process.env.ACCESS_TOKEN_VALIDITY_DAYS || "1"
  ),
  refreshTokenValidityDays: parseInt(
    process.env.refresh_tokenN_VALIDITY_DAYS || "1"
  ),
  issuer: process.env.TOKEN_ISSUER || "Takiacademy Team",
  audience: process.env.TOKEN_AUDIENCE || "TakiKids Admin",
};
export const logDirectory = process.env.LOG_DIR;
