import kangae_app from './app.js';
import cnf_env_variables from './configs/env-variables.cnf.js';
import cnf_logger from './configs/logger.cnf.js';
import utl_run_server from './utilities/run-server.utl.js';
import utl_connect_db from './utilities/connect-db.utl.js';
import utl_server_error_handler from './utilities/server-error.utl.js';

// define server
let server;

// Run the application
try {
  // 1. start the database connection
  await utl_connect_db(cnf_env_variables.env_mongoose_url);

  // 2. Start the server
  server = utl_run_server(server, kangae_app, cnf_env_variables.env_port);

  // ---
} catch (error) {
  cnf_logger.error('Error during server startup:', error);
  process.exit(1);
}

// Attach handlers for process events
process.on('uncaughtException', utl_server_error_handler(server));
process.on('unhandledRejection', utl_server_error_handler(server));

// Handle shutdown on SIGTERM:
process.on('SIGTERM', () => {
  cnf_logger.info('SIGTERM received');
  utl_server_error_handler(server);
});

// Handle shutdown on SIGINT:
process.on('SIGINT', () => {
  cnf_logger.info('SIGINT received');
  utl_server_error_handler(server);
});
