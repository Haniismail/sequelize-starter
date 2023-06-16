import { environment } from "../config";
import multer from "multer";
import { join } from "path";
import { UploadRequest } from "../types/uploadRequest";
import { IMAGE_UPLOAD_DESTINATIONS } from "./addImageUploadDestination";

export enum imageEnum {
  photo = "photo",
  imageFile = "imageFile",
  avatar = "avatar",
}

//file specifications
const multerStorage = multer.diskStorage({
  //where we will store
  destination: (req: UploadRequest, file, cb) => {
    const dest = req.destination || IMAGE_UPLOAD_DESTINATIONS.OTHER;
    cb(
      null,
      environment && environment === "production"
        ? join(__dirname, `../..${dest}`)
        : join(__dirname, `..${dest}`)
    );
  },
  //differentiate the files
  filename: (req: UploadRequest, file, cb) => {
    //set the date
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    //adds a / in the space between
    let extArray = file.mimetype.split("/");

    let extension = extArray[extArray.length - 1];
    //set the name upon the upload
    const fileName = file.fieldname + "-" + uniqueSuffix + "." + extension;
    req.fileName = fileName;
    cb(null, fileName);
  },
});

const multerFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please only images", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  // limits: {}
});

export const uploadImage = (entryEnum: imageEnum) => {
  return upload.single(entryEnum);
};
