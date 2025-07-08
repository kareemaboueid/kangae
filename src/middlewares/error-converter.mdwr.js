import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Api_Error from '../utilities/Api-error.utl.js';

/**
 * Error converter middleware
 * @description This middleware converts errors to Api_Error instances.
 */
const mdwr_error_converter = (p_error, p_request, p_response, p_next) => {
  let error = p_error;

  // Convert to Api_Error if not already
  if (!(error instanceof Api_Error)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new Api_Error(statusCode, message, false, p_error.stack);
  }

  p_next(error);
};

export default mdwr_error_converter;
