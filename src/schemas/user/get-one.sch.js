import Joi from 'joi';
import vld_validations from '../validations/index-vld.js';

export const get_one = {
  params: Joi.object().keys({
    userId: Joi.string().custom(vld_validations.object_id_field),
  }),
};
