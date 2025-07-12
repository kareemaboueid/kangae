import express from 'express';
import mdwr_validate_request from '../../middlewares/validate-request.mdwr.js';
import schema_user from "../../schemas/user/index-user.js"
import ctrl_user from '../../controllers/user/index-user.js';

/**
 * ### User Route
 * @endpoint `/v1/user`
 * @description Handles user-related routes.
 */
const route_user = express.Router();

route_user

// create new user route: `POST /v1/user`
.post('/', mdwr_validate_request(schema_user.create), ctrl_user.create())

// get all users route: `GET /v1/user`
.get('/', mdwr_validate_request(schema_user.get_all), ctrl_user.get_all())

// get user by id route: `GET /v1/user/:id`
.get('/:id', mdwr_validate_request(schema_user.get_one), ctrl_user.get_one())

// update user by id route: `PUT /v1/user/:id/update`
.patch('/:id/update', mdwr_validate_request(schema_user.update), ctrl_user.update())

// freeze user by id route: `DELETE /v1/user/:id/freeze`
.patch('/:id/freeze', mdwr_validate_request(schema_user.freeze), ctrl_user.freeze())

export default route_user;
