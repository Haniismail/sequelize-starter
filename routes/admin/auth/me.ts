import authentication from "../../../auth/authentication";
import express from "express";
const { me } = require("../../../controllers/admin/authController");
const router = express.Router();
/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 */

router.use("/", authentication);

/**
 * @swagger
 * /api/me :
 *  get:
 *    security:
 *       - bearerAuth: []
 *    summary: get information about logged in user
 *    tags: [Admin/Auth]
 *    responses:
 *      200:
 *          description: this route is used by all users thus it does not have a common schema for all user types
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: number
 *                    example: 200
 *                  message:
 *                    type: string
 *                    example: Login Success
 *                  payload:
 *                    type: object
 *                    properties:
 *                      user:
 *                        type: object
 *      400:
 *        description: 	Validation Failed
 *      401:
 *        description: Error Token
 *      403:
 *        description: Access Denied / Unauthorized
 *      500:
 *        description: Internal server error
 */

router.get("/", me);

export default router;
