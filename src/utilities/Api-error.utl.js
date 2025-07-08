/**
 * Utl_Api_Error class for handling API errors.
 * @description This class extends the built-in Error class to create a custom error type for API errors.
 */
class Utl_Api_Error extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);

    this.statusCode = statusCode;

    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default Utl_Api_Error;
