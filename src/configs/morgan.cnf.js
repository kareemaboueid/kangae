import morgan from 'morgan';
import obj_configs from './env-variables.cnf.js';
import cnf_logger from './logger.cnf.js';

morgan.token('message', (p_request, p_response) => p_response.locals.errorMessage || '');

// Get the IP format based on the environment
const fn_get_ip_format = () => (obj_configs.ENV_MODE === 'production' ? ':remote-addr - ' : '');

// Define the success and error response formats
const success_response_format = `${fn_get_ip_format()}:method :url :status - :response-time ms`;
const error_response_format = `${fn_get_ip_format()}:method :url :status - :response-time ms - message: :message`;

/**
 * Success response handler
 * @description This handler logs successful responses.
 */
const success = morgan(success_response_format, {
  skip: (p_request, p_response) => p_response.statusCode >= 400,
  stream: { write: (message) => cnf_logger.info(message.trim()) }
});

/**
 * Error response handler
 * @description This handler logs error responses.
 */
const error = morgan(error_response_format, {
  skip: (p_request, p_response) => p_response.statusCode < 400,
  stream: { write: (message) => cnf_logger.error(message.trim()) }
});

const cnf_morgan_messager = { success, error };

export default cnf_morgan_messager;
