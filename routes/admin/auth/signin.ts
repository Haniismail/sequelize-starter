import express from "express";
const schema = require("./authSchema");
const { signin } = require("../../../controllers/admin/authController");
const router = express.Router();
const joiValidator = require("../../../middlewares/JoiValidator");

/**
 * @swagger
 * /api/signin :
 *  post:
 *    security:
 *       - bearerAuth: []
 *    tags: [Admin/Auth]
 *    summary: login
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *                format: password
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
 *                    example: Login Success
 *                  payload:
 *                    type: object
 *                    properties:
 *                      tokens:
 *                        type: object
 *                        properties:
 *                          accessToken:
 *                            type: string
 *                            example: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJUYWtpQWNhZGVteSBUZWFtIiwiYXVkIjoiVGFraUtpZHMgQWRtaW4gIiwic3ViIjozLCJpYXQiOjE2NzAzOTU0MzMsImV4cCI6MTY3MDQ4MTgzMywicHJtIjoiNjZjODNiOWY3Yzc4NTM4M2Q5NWI0MDkxZGM2YzdjYzhhZTAxYWZjNjI3M2FiZWMzNWJiMmNjZGQ3NDMzODdkMzNhNTUyZGFkZWM5MmYyMjNiZGQwZDNlMDY4M2UyY2QyZWQwZDk4MmQwMTk4NTBlMjIzNGEwZjc4NjBkNGI5MmMiLCJyb2xlIjoiYWRtaW4ifQ.I6kRTosK9Gx9cAA5zjgEP8IIhro-yip9XNCx49tYVYM7-EiGj0ICjILZW5kU2DUP_SmxplevDafNW0wxkT4nYA
 *                          refreshToken:
 *                            example: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJUYWtpQWNhZGVteSBUZWFtIiwiYXVkIjoiVGFraUtpZHMgQWRtaW4gIiwic3ViIjozLCJpYXQiOjE2NzAzOTU0MzMsImV4cCI6MTY3MDQ4MTgzMywicHJtIjoiNjZjODNiOWY3Yzc4NTM4M2Q5NWI0MDkxZGM2YzdjYzhhZTAxYWZjNjI3M2FiZWMzNWJiMmNjZGQ3NDMzODdkMzNhNTUyZGFkZWM5MmYyMjNiZGQwZDNlMDY4M2UyY2QyZWQwZDk4MmQwMTk4NTBlMjIzNGEwZjc4NjBkNGI5MmMiLCJyb2xlIjoiYWRtaW4ifQ.I6kRTosK9Gx9cAA5zjgEP8IIhro-yip9XNCx49tYVYM7-EiGj0ICjILZW5kU2DUP_SmxplevDafNW0wxkT4nYA
 *      401:
 *        description: Error Token
 *      403:
 *        description: Access Denied / Unauthorized
 *      500:
 *        description: Internal server error
 */
router.post("/", joiValidator(schema.adminCredential), signin);

export default router;
