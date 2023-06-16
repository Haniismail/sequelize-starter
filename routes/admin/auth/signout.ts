//export {};

const express = require("express");
const router = express.Router();
const { signout } = require("../../../controllers/admin/authController");
const authentication = require("../../../auth/authentication");
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

router.use("/", authentication);

/**
 * @swagger
 * /api/signout :
 *  delete:
 *    security:
 *       - bearerAuth: []
 *    summary: logout
 *    tags: [Admin/Auth]
 *
 *    responses:
 *      200:
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
 *                    example: Logout success
 *
 *      401:
 *        description: Error Token
 *      403:
 *        description: Access Denied / Unauthorized
 *      500:
 *        description: Internal server error
 */

//by default middleware takes body as a second parameter
router.delete("/", signout);

export default router;
