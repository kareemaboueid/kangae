import Joi from 'joi';
import httpStatus from 'http-status';
import utl_pick_from_object from '../utilities/extract-object.utl.js';
import Utl_Api_Error from '../utilities/Api_error.utl.js';

/**
 * Middleware to validate request parameters, query, and body against a Joi schema.
 * @param {Object} p_schema - The Joi schema to validate against.
 * @returns {Function}
 */
const mdwr_validate_request = (p_schema) => (p_request, p_response, p_next) => {
  // Validate the request against the provided schema
  const valid_schema = utl_pick_from_object(
    p_schema,
    // the keys to validate: params, query, body:
    ['params', 'query', 'body']
  );

  // Create a target object from the request
  const target_object = utl_pick_from_object(p_request, Object.keys(valid_schema));

  // define the value and error after Joi validation
  const { value, error } = Joi.compile(valid_schema)
    .prefs({
      errors: { label: 'key' },
      abortEarly: false
    })
    // Validate the target object against the schema
    .validate(target_object);

  // If validation fails, return an error response
  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return p_next(new Utl_Api_Error(httpStatus.BAD_REQUEST, errorMessage));
  }

  // If validation passes, assign the validated value to the request object
  Object.assign(p_request, value);

  // Call the next middleware in the stack
  return p_next();
};

export default mdwr_validate_request;
