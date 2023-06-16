import { Request } from "express";

export interface UploadRequest extends Request {
  user?: any;
  fileName?: string;
  destination?: string;
}
