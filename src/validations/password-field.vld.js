/**
 * Custom validation for password strength
 * @param {string} p_value - The password to validate
 * @param {Object} p_helpers - The Joi validation helpers
 * @returns {string} - The validated password or an error message
 */
export const password_field = (p_value, p_helpers) => {
  // Check if the password meets the criteria:
  // 1.
  if (p_value.length < 8) {
    return p_helpers.message('password must be at least 8 characters');
  }

  // 2.
  if (!p_value.match(/\d/) || !p_value.match(/[a-zA-Z]/)) {
    return p_helpers.message('password must contain at least 1 letter and 1 number');
  }

  return p_value;
};

