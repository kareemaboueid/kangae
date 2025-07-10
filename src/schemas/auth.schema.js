import Joi from 'joi'
import vld_password_field from "../validations/password-field.vld.js";

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(vld_password_field),
    name: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

// TODO - Implement forgot & reset password

const schema_auth = {
  register,
  login,
  logout,
  refreshTokens
};


export default schema_auth;