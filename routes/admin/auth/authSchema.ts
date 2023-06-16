//export {};
import Joi from "@hapi/joi";

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         username:
 *           type: string
 *           example: jhondoe
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *         roleId:
 *           type: string
 *           example: 1
 *         birthday:
 *           type: string
 *           format: date
 *         firstname:
 *           type: string
 *           example: Jhon
 *         photo:
 *           type: string
 *         gender:
 *           type: string
 *           example: male
 *         phone:
 *           type: string
 *           example: 12345678
 *     UpdateAdmin:
 *       schema:
 *         type: object
 *         properties:
 *           username:
 *             type: string
 *             example: jhon_doe
 *           email:
 *             type: string
 *             format: email
 *           password:
 *             type: string
 *             format: password
 *           birthday:
 *             type: string
 *             format: date
 *           firstname:
 *             type: string
 *             example: Jhon
 *           last_name:
 *             type: string
 *             example: Doe
 *           photo:
 *             type: string
 *           website:
 *             type: string
 *           biography:
 *             type: string
 *           gender:
 *             type: string
 *             example: male
 *           local:
 *             type: string
 *           timezone:
 *             type: string
 *           phone:
 *             type: number
 *             example: 12345678
 *
 *     CreateAdmin:
 *       schema:
 *         type: object
 *         required:
 *           - username
 *           - role
 *           - email
 *           - password
 *           - birthday
 *           - firstname
 *           - last_name
 *           - phone
 *         properties:
 *           username:
 *             type: string
 *             example: jhon_doe
 *           role:
 *             type: string
 *             example: admin
 *           email:
 *             type: string
 *             format: email
 *           password:
 *             type: string
 *             format: password
 *           birthday:
 *             type: string
 *             format: date
 *           firstname:
 *             type: string
 *             example: Jhon
 *           last_name:
 *             type: string
 *             example: Doe
 *           photo:
 *             type: string
 *             format: binary
 *           website:
 *             type: string
 *           biography:
 *             type: string
 *           gender:
 *             type: string
 *             example: male
 *           local:
 *             type: string
 *           timezone:
 *             type: string
 *           phone:
 *             type: number
 *             example: 12345678
 */

const schema = {
  authSchema: Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    role: Joi.string().min(2).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    birthday: Joi.date().min(1).required(),
    firstname: Joi.string().alphanum().min(3).max(30).required(),
    last_name: Joi.string().alphanum().min(3).max(30).required(),
    website: Joi.string().min(2),
    biography: Joi.string().min(2),
    gender: Joi.string().min(2),
    local: Joi.string().min(2),
    timezone: Joi.date().min(2),
    phone: Joi.number().min(2).required(),
  }),
  adminCredential: Joi.object().keys({
    username: Joi.string().required().min(2),
    password: Joi.string().required().min(8),
  }),
  updateAdminSchema: Joi.object({
    username: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    birthday: Joi.date().min(1),
    firstname: Joi.string().alphanum().min(3).max(30),
    lastName: Joi.string().alphanum().min(3).max(30),
    website: Joi.string().min(2),
    biography: Joi.string().min(2),
    gender: Joi.string().min(2),
    local: Joi.string().min(2),
    timezone: Joi.date().min(2),
    phone: Joi.number().min(2),
  }),
};

module.exports = schema;
