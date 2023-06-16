//export {};

const express = require("express");
const router = express.Router();
const { updateAdmin } = require("../../../controllers/admin/authController");
const authentication = require("../../../auth/authentication");
import { uploadImage, imageEnum } from "../../../middlewares/UploadImage";
const schema = require("./authSchema");
const joiValidator = require("../../../middlewares/JoiValidator");

/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 */

//TAGS
/**
 * @swagger
 * tags:
 *  name: SuperAdmin/admins
 *  description: admins API
 */

router.use("/", authentication);

/**
 * @swagger
 * /api/admin/update/{id} :
 *  put:
 *    security:
 *       - bearerAuth: []
 *    summary: update admin
 *    tags: [SuperAdmin/admins]
 *
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *            type: string
 *       required: true
 *       description: admin id
 *    requestBody:
 *      content:
 *        application/json:
 *          $ref: '#/components/schemas/UpdateAdmin'
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
 *                message:
 *                  type: string
 *                  example: admin updated successfully
 *      400:
 *        description: 	Validation Failed
 *      401:
 *        description: Error Token
 *      403:
 *        description: Access Denied / Unauthorized
 *      500:
 *        description: Internal server error
 *
 */

//by default middleware takes body as a second parameter
router.put(
  "/update/:id",
  uploadImage(imageEnum.photo),
  joiValidator(schema.updateAdminSchema),
  updateAdmin
);
export default router;
