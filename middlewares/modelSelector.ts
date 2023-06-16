import { NextFunction, Response } from "express";
const { Admin, Child, Parent } = require("../database/models");

export enum modelEnum {
  admin = Admin,
  parent = Parent,
  child = Child,
}

const middleware = (
  res: Response,
  next: NextFunction,
  selectedModel: modelEnum
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    selectedModel;
  };
};
module.exports = middleware;
