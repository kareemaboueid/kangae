import httpStatus from 'http-status';
import obj_configs from '../configs/env-variables.cnf.js';
import cnf_logger from '../configs/logger.cnf.js';

/**
 * Error handler middleware
 * @description This middleware handles errors in the application.
 */
const mdwr_error_handler = (p_error, p_request, p_response, p_next) => {
  let { statusCode, message } = p_error;

  // Handle production errors:
  if (obj_configs.ENV_MODE === 'production' && !p_error.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  // Set error message for response
  p_response.locals.errorMessage = p_error.message;

  // Create response object
  const response = {
    code: statusCode,
    message,
    ...(obj_configs.ENV_MODE === 'development' && { stack: p_error.stack })
  };

  // Log error details in development mode
  if (obj_configs.ENV_MODE === 'development') {
    cnf_logger.error(p_error);
  }

  // Send response
  p_response.status(statusCode).send(response);
};

export default mdwr_error_handler;
