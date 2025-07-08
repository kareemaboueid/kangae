import cnf_logger from '../configs/logger.cnf.js';

/**
 * Handles unexpected server errors by logging the error and closing the server.
 *
 */
const utl_server_error_handler = (p_server) => (p_error) => {
  cnf_logger.error(p_error);
  if (p_server) {
    p_server.close(() => {
      cnf_logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

export default utl_server_error_handler;
