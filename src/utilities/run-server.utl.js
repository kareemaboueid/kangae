import cnf_logger from '../configs/logger.cnf.js';

/**
 * This function starts the server using the provided Express instance and environment variables.
 * @param {*} p_server - The server instance to be started.
 * @param {*} p_express_instance - The Express application instance to listen on.
 * @param {number} p_port - The port number on which the server should listen.
 * @returns {*} - Returns the server instance after starting it.
 */
const utl_run_server = (p_server, p_express_instance, p_port) => {
  try {
    // start the server:
    p_server = p_express_instance.listen(p_port, () => {
      cnf_logger.info(`Listening to port ${p_port}`);
    });

    // ---
  } catch (error) {
    cnf_logger.error('Error starting server:', error);

    // close the server if it exists:
    if (p_server) {
      p_server.close(() => {
        cnf_logger.info('Server closed');
      });
    }
    process.exit(1);
  }

  return p_server;
};

export default utl_run_server;
