import express from 'express';
import utl_routes_mapping from '../../utilities/routes-mapping.utl.js';

// Importing routes
import route_user from './user.route.js';

/**
 * ### App Route version 1
 * @description This module defines the main routes for version 1 of the API.
 * @version 1
 * @endpoint `/v1`
 */
const route_v1 = express.Router();

const v1_main_routes = [
  { name: 'route_user', path: '/users', route: route_user },
];

// Map routes to router:
utl_routes_mapping({
  routes_array: v1_main_routes,
  router_instance: route_v1
});

export default route_v1;
