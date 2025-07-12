import Joi from 'joi';
import vld_validations from '../validations/index-vld.js';

export const update = {
  params: Joi.object().keys({
    userId: Joi.required().custom(vld_validations.object_id_field),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(vld_validations.password_field),
      name: Joi.string(),
    })
    .min(1),
};
