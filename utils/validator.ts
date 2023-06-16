// import Joi from "@hapi/joi";
import Joi from "@hapi/joi";
import { Request, Response, NextFunction } from "express";
import Logger from "../core/Logger";
import { BadRequestResponse } from "../core/ApiResponse";
export enum ValidationSource {
  BODY = "body",
  HEADER = "headers",
  QUERY = "query",
  PARAM = "params",
}

export const JoiUrlEndpoint = () =>
  Joi.string().custom((value: string, helpers: any) => {
    if (value.includes("://")) return helpers.error("any.invalid");
    return value;
  }, "Url Endpoint Validation");

export const JoiAuthBearer = () =>
  Joi.string().custom((value: string, helpers: any) => {
    if (!value.startsWith("Bearer ")) return helpers.error("any.invalid");
    if (!value.split(" ")[1]) return helpers.error("any.invalid");
    return value;
  }, "Authorization Header Validation");

export default (
    schema: Joi.ObjectSchema,
    source: ValidationSource = ValidationSource.BODY
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req[source]);

      if (!error) return next();

      const { details } = error;
      const message = details
        .map((i: any) => i.message.replace(/['"]+/g, ""))
        .join(",");

      Logger.error(message);

      return new BadRequestResponse(message).send(res);
    } catch (error) {
      next(error);
    }
  };
