//export {};
import authentication from "../../../auth/authentication";
import role from "../../../utils/role";
import { RoleCode } from "../../../database/models/role";
import authorization from "../../../auth/authorization";
const express = require("express");
const router = express.Router();

//IMPORT THE CONTROLLER FUNCTIONS
const {
  createParent,
  findPopulatedParents,
  updateParent,
  allParents,
  getParent,
  deleteParent,
} = require("../../../controllers/admin/parentController");

//import parent joi validation
const schema = require("./parentSchema");
//import the middleware
const joiValidator = require("../../../middlewares/JoiValidator");
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

//TAGS
/**
 * @swagger
 * tags:
 *  name: Admin/Parents
 *  description: parents API
 */
router.use("/", authentication, role(RoleCode.ADMIN), authorization);

// DECLARE PARENT ROUTES

/**
 * @swagger
 * /api/parent/create :
 *  post:
 *    security:
 *       - bearerAuth: []
 *    summary: create new parent
 *    tags: [Admin/Parents]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateParent'
 *
 *    responses:
 *      200:
 *        description: parent created successfully
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
 *                    parent:
 *                      $ref: '#/components/schemas/Parent'
 *      400:
 *        description: 	Validation Failed
 *      401:
 *        description: Error Token
 *      403:
 *        description: Access Denied / Unauthorized
 *      500:
 *        description: Internal server error
 */

router.post("/create", joiValidator(schema.parentSchema), createParent);
/**
 * @swagger
 * /api/parent/find :
 *  get:
 *    security:
 *       - bearerAuth: []
 *    summary: get all parents populated
 *    tags: [Admin/Parents]
 *    responses:
 *      200:
 *          description: all parents returned successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: success
 *                  data:
 *                    type: object
 *                    properties:
 *                      parents:
 *                        type: array
 *                        items:
 *                          $ref: '#/components/schemas/PopulatedParent'
 *      401:
 *        description: Error Token
 *      403:
 *        description: Access Denied / Unauthorized
 *      500:
 *        description: Internal server error
 */

router.get("/find", findPopulatedParents);

/**
 * @swagger
 * /api/parent/update/{id} :
 *  put:
 *    security:
 *       - bearerAuth: []
 *    summary: update parent
 *    tags: [Admin/Parents]
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateParent'
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *            type: string
 *       required: true
 *       description: parent id
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
 *                  example: Parent updated successfully
 *      400:
 *        description: 	Validation Failed
 *      401:
 *        description: Error Token
 *      403:
 *        description: Access Denied / Unauthorized
 *      500:
 *        description: Internal server error
 */

router.put("/update/:id", joiValidator(schema.updateParentSchema), updateParent);

/**
 * @swagger
 * /api/parent/all :
 *  get:
 *    security:
 *       - bearerAuth: []
 *    summary: get all parents
 *    tags: [Admin/Parents]
 *    responses:
 *      200:
 *          description: all parents returned successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: success
 *                  data:
 *                    type: object
 *                    properties:
 *                       parents:
 *                        type: array
 *                        items:
 *                          $ref: '#/components/schemas/Parent'
 *      401:
 *        description: Error Token
 *      403:
 *        description: Access Denied / Unauthorized
 *      500:
 *        description: Internal server error
 */

router.get("/all", allParents);

/**
 * @swagger
 * /api/parent/get/{id} :
 *  get:
 *    security:
 *       - bearerAuth: []
 *    summary: get one parent
 *    tags: [Admin/Parents]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *            type: string
 *       required: true
 *       description: parent id
 *    responses:
 *      200:
 *          description: parents returned successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: success
 *                  data:
 *                    type: object
 *                    properties:
 *                      parent:
 *                        $ref: '#/components/schemas/Parent'
 *      401:
 *        description: Error Token
 *      403:
 *        description: Access Denied / Unauthorized
 *      500:
 *        description: Internal server error
 */

router.get("/get/:id", getParent);

/**
 * @swagger
 * /api/parent/delete/{id} :
 *  delete:
 *    security:
 *       - bearerAuth: []
 *    summary: delete parent
 *    tags: [Admin/Parents]
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *            type: string
 *       required: true
 *       description: parent id
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
 *                  example: 'Parent deleted successfully '
 *      400:
 *        description: 	Validation Failed
 *      401:
 *        description: Error Token
 *      403:
 *        description: Access Denied / Unauthorized
 */

router.delete("/delete/:id", deleteParent);

export default router;
