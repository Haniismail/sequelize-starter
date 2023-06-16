//export {};
import Joi from "@hapi/joi";

/**
 * @swagger
 * components:
 *   schemas:
 *     Parent:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         email:
 *           type: string
 *           format: email
 *         name:
 *           type: string
 *           example: ali
 *         last_name:
 *           type: string
 *           example: ghali
 *         password:
 *           type: string
 *           format: password
 *           example: $2b$13$X3M0R8eZ37J9x9VycdZjC.X4VESk...
 *         confirmation_token:
 *           type: string
 *           example: 74x406
 *         roleId:
 *           type: number
 *           example: 3
 *         username:
 *           type: string
 *           example: hanikids168684694
 *         address:
 *           type: string
 *           example: Sousse
 *         countries:
 *           type: String
 *           example: TN
 *         phone_number:
 *           type: string
 *           example: 12345678
 *         verified:
 *           type: boolean
 *           example: false
 *         confirmed:
 *           type: boolean
 *           example: false
 *         last_login_at:
 *           type: string
 *           example: date
 *         smsattempt:
 *           type: number
 *           example: 1
 *     CreateParent:
 *       type: object
 *       required:
 *         - email
 *         - name
 *         - last_name
 *         - password
 *         - address
 *         - countries
 *         - phone_number
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         name:
 *           type: string
 *           example: ali
 *         last_name:
 *           type: string
 *           example: ghali
 *         password:
 *           type: string
 *           format: password
 *         address:
 *           type: string
 *           example: Sousse
 *         countries:
 *           type: String
 *           example: TN
 *         phone_number:
 *           type: string
 *           example: 12345678
 *     PopulatedParent:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         email:
 *           type: string
 *           format: email
 *         name:
 *           type: string
 *           example: ali
 *         last_name:
 *           type: string
 *           example: ghali
 *         password:
 *           type: string
 *           format: password
 *           example: $2b$13$X3M0R8eZ37J9x9VycdZjC.X4VESk...
 *         confirmation_token:
 *           type: string
 *           example: 74x406
 *         roleId:
 *           type: number
 *           example: 3
 *         username:
 *           type: string
 *           example: hanikids168684694
 *         address:
 *           type: string
 *           example: Sousse
 *         countries:
 *           type: String
 *           example: TN
 *         phone_number:
 *           type: string
 *           example: 12345678
 *         verified:
 *           type: boolean
 *           example: false
 *         confirmed:
 *           type: boolean
 *           example: false
 *         last_login_at:
 *           type: string
 *           example: date
 *         smsattempt:
 *           type: number
 *           example: 1
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Child'
 */

const schema = {
  parentSchema: Joi.object({
    email: Joi.string()
      .min(5)
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .allow(null, ''),
    name: Joi.string().min(2).required(),
    last_name: Joi.string().min(2).required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    address: Joi.string().min(2).required(),
    countries: Joi.string().min(2).max(2).required(),
    phone_number: Joi.string().min(8).max(8).allow(null, ''),
  }),

  updateParentSchema: Joi.object({
    email: Joi.string()
      .min(5)
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .allow(null),
    name: Joi.string().min(2),
    last_name: Joi.string().min(2),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    address: Joi.string().min(2),
    phone_number: Joi.string().min(8).max(8).allow(null),
  }),
};

module.exports = schema;
