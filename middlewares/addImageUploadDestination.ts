import { NextFunction, Response } from "express";
import { UploadRequest } from "uploadRequest";

export enum IMAGE_UPLOAD_DESTINATIONS {
  CHILD = "/uploads/images/users/",
  REPORT = "/uploads/images/reports/",
  OTHER = "/uploads/images/",
}

export default (destination: IMAGE_UPLOAD_DESTINATIONS) =>
  (req: UploadRequest, res: Response, next: NextFunction) => {
    req.destination = destination;
    next();
  };
