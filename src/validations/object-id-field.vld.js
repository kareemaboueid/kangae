/**
 * Validates a MongoDB ObjectId
 * @param {string} p_value - The value to validate
 * @param {Object} p_helpers - The Joi validation helpers
 * @returns {string} - The validated value or an error message
 */
const vld_object_id_field = (p_value, p_helpers) => {
  // Check if the value is a valid MongoDB ObjectId
  if (!p_value.match(/^[0-9a-fA-F]{24}$/)) {
    return p_helpers.message('"{{#label}}" must be a valid mongo id');
  }

  return p_value;
};

export default vld_object_id_field;
