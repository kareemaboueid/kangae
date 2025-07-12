import cnf_logger from '../configs/logger.cnf.js';

// sanitize path by removing trailing slashes
const sanitize_path = (p_path) => p_path.replace(/\/+$/, '');

/**
 * ### Route mapping function
 * @description Maps an array of route definitions to an Express router instance.
 * @param {{
 *   routes_array: Array<{ path: string, route: any, name?: string }>,
 *   router_instance: import('express').Router,
 * }} params
 */
const utl_routes_mapping = ({ routes_array, router_instance }) => {
  // check if routes_array is an array:
  if (!Array.isArray(routes_array)) {
    cnf_logger.error('routes_array must be an array of route definitions.');
    return;
  }

  // define sets to track duplicates:
  const logged_path_duplicates = new Set();
  const logged_route_duplicates = new Set();

  // Normalize and validate routes:
  const routes_to_check = routes_array
    .map((route_record) => {
      // Basic check for required properties:
      if (!route_record.path || typeof route_record.path !== 'string' || !route_record.route) {
        cnf_logger.error(`Invalid route object: ${JSON.stringify(route_record)}`);
        return null;
      }

      // return normalized route object:
      return {
        name: route_record.name || 'unnamed_route',
        path: sanitize_path(route_record.path),
        route: route_record.route
      };
    })
    // remove nulls caused by failed validations:
    .filter(Boolean);

  // Count occurrences:
  const path_counter = {};
  const route_counter = new Map();

  // Count occurrences:
  routes_to_check.forEach(({ path, route }) => {
    path_counter[path] = (path_counter[path] || 0) + 1;
    route_counter.set(route, (route_counter.get(route) || 0) + 1);
  });

  // Log duplicate route handlers
  for (const [route, count] of route_counter.entries()) {
    if (count > 1 && !logged_route_duplicates.has(route)) {
      const route_name = routes_to_check.find((r) => r.route === route)?.name || 'unknown_route';
      cnf_logger.warn(
        `Duplicated route handler detected: "${route_name}" appears ${count} times. (Route: ${route_name})`
      );
      logged_route_duplicates.add(route);
      process.exit(1);
    }
  }

  // Log duplicate paths
  for (const [path, count] of Object.entries(path_counter)) {
    if (count > 1 && !logged_path_duplicates.has(path)) {
      const route_name = routes_to_check.find((r) => r.path === path)?.name || 'unknown_route';
      cnf_logger.warn(`Duplicated path detected: "${path}" appears ${count} times. (Route name: ${route_name})`);
      logged_path_duplicates.add(path);
      process.exit(1);
    }
  }

  // Map to router
  routes_to_check.forEach(({ path, route }) => {
    router_instance.use(path, route);
  });
};

export default utl_routes_mapping;
