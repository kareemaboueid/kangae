import Joi from 'joi';
import vld_validations from '../validations/index-vld.js';

export const create = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(vld_validations.password_field),
    name: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};
