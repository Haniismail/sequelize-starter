const express = require("express");
const router = express.Router();
const { signup } = require("../../../controllers/admin/authController");
const schema = require("./authSchema");
const joiValidator = require("../../../middlewares/JoiValidator");
import { uploadImage, imageEnum } from "../../../middlewares/UploadImage";
import role from "../../../utils/role";
import { RoleCode } from "../../../database/models/role";
import addImageUploadDestination from "../../../middlewares/addImageUploadDestination";
import { IMAGE_UPLOAD_DESTINATIONS } from "../../../middlewares/addImageUploadDestination";

//Auth
/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 */

/**
 * @swagger
 * /api/signup :
 *  post:
 *    security:
 *       - bearerAuth: []
 *    summary: create new admin
 *    tags: [SuperAdmin/admins]
 *
 *    requestBody:
 *      content:
 *        multipart/form-data:
 *          $ref: '#/components/schemas/CreateAdmin'
 *
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: success
 *                data:
 *                  type: object
 *                  properties:
 *                    createdAdmin:
 *                      $ref: '#/components/schemas/Admin'
 *                    tokens:
 *                      type: object
 *                      properties:
 *                        accessToken:
 *                          type: string
 *                          example: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJUYWtpQWNhZGVteSBUZWFtIiwiYXVkIjoiVGFraUtpZHMgQWRtaW4gIiwic3ViIjozLCJpYXQiOjE2NzAzOTU0MzMsImV4cCI6MTY3MDQ4MTgzMywicHJtIjoiNjZjODNiOWY3Yzc4NTM4M2Q5NWI0MDkxZGM2YzdjYzhhZTAxYWZjNjI3M2FiZWMzNWJiMmNjZGQ3NDMzODdkMzNhNTUyZGFkZWM5MmYyMjNiZGQwZDNlMDY4M2UyY2QyZWQwZDk4MmQwMTk4NTBlMjIzNGEwZjc4NjBkNGI5MmMiLCJyb2xlIjoiYWRtaW4ifQ.I6kRTosK9Gx9cAA5zjgEP8IIhro-yip9XNCx49tYVYM7-EiGj0ICjILZW5kU2DUP_SmxplevDafNW0wxkT4nYA
 *                        refreshToken:
 *                          type: string
 *                          example: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJUYWtpQWNhZGVteSBUZWFtIiwiYXVkIjoiVGFraUtpZHMgQWRtaW4gIiwic3ViIjozLCJpYXQiOjE2NzAzOTU0MzMsImV4cCI6MTY3MDQ4MTgzMywicHJtIjoiNjZjODNiOWY3Yzc4NTM4M2Q5NWI0MDkxZGM2YzdjYzhhZTAxYWZjNjI3M2FiZWMzNWJiMmNjZGQ3NDMzODdkMzNhNTUyZGFkZWM5MmYyMjNiZGQwZDNlMDY4M2UyY2QyZWQwZDk4MmQwMTk4NTBlMjIzNGEwZjc4NjBkNGI5MmMiLCJyb2xlIjoiYWRtaW4ifQ.I6kRTosK9Gx9cAA5zjgEP8IIhro-yip9XNCx49tYVYM7-EiGj0ICjILZW5kU2DUP_SmxplevDafNW0wxkT4nYA
 *      400:
 *        description: 	Validation Failed
 *      401:
 *        description: Error Token
 *      403:
 *        description: Access Denied / Unauthorized
 *      500:
 *        description: Internal server error
 */

//by default middleware takes body as a second parameter
router.post(
  "/",
  role(RoleCode.SUPERADMIN),
  uploadImage(imageEnum.photo),
  joiValidator(schema.authSchema),
  signup
);

export default router;
