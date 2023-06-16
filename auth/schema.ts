// import Joi from '@hapi/joi';
import Joi from "@hapi/joi";
import { JoiAuthBearer } from "../utils/validator";

export default {
  apiKey: Joi.object()
    .keys({
      "x-api-key": Joi.string().required(),
    })
    .unknown(true),
  auth: Joi.object()
    .keys({
      authorization: JoiAuthBearer().required(),
    })
    .unknown(true),
};
