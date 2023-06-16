import { NextFunction, Request, Response } from "express";

export enum propertyEnum {
  body = "body",
  query = "query",
  params = "params",
  HEADERS = "headers",
}

const middleware = (
  schema: any,
  property: propertyEnum = propertyEnum.body
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property]);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i: any) => i.message).join(",");
      console.log("error", message);
      res.status(422).json({ status: "failed", error: message });
    }
  };
};
module.exports = middleware;
