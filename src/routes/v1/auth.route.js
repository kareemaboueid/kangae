import express from 'express';

// middlewares:
import mdwr_validate_request from '../../middlewares/validate-request.mdwr.js';
import schema_auth from "../../schemas/auth.schema.js"

// controllers:
// TODO import all auth controllers

/**
 * ### Auth Route
 * @endpoint `/v1/auth`
 * @description Handles authentication-related routes.
 */
const route_auth = express.Router();

route_auth

// TODO register route: `POST /v1/auth/register`
  .post('/register', ctrl_register)
  .post('/register', mdwr_validate_request(schema_auth.register), );

// ---------------------

// TODO Login route: `POST /v1/auth/login`
// .post('/login', ctrl_login)

// ---------------------

// TODO Logout route: `POST /v1/auth/logout`
// .post('/logout', ctrl_logout)

// ---------------------

// TODO Refresh tokens route: `POST /v1/auth/refresh-tokens`
// .post('/refresh-tokens', ctrl_refresh_tokens);

// ---------------------

// TODO implementing forgot & reset password:
// forgot-password feature: `POST /v1/auth/forgot-password`
// reset-password feature: `POST /v1/auth/reset-password`

export default route_auth;
