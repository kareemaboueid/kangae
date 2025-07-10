import express from 'express';
import utl_routes_mapping from '../../utilities/routes-mapping.utl.js';

// Importing routes
import route_auth from './auth.route.js';

/**
 * ### App Route
 * @version 1
 * @endpoint `/v1`
 */
const route_v1 = express.Router();

const v1_main_routes = [
  { name: 'route_auth', path: '/auth', route: route_auth },
];

// Map routes to router:
utl_routes_mapping({
  routes_array: v1_main_routes,
  router_instance: route_v1
});

export default route_v1;
