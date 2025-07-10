/**
 * Custom validation for phone numbers
 * @param {string} p_value - The phone number to validate
 * @param {Object} p_helpers - The Joi validation helpers
 * @returns {string} - The validated phone number or an error message
 */
const vld_phone_field = (p_value, p_helpers) => {
  // Check if the phone number is valid, should be a string of digits length 10
  if (!p_value.match(/^\d{10}$/)) {
    return p_helpers.message('"{{#label}}" must be a valid phone number');
  }

  return p_value;
};

export default vld_phone_field;
