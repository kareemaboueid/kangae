import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

// environment variables validation schema
const env_variables_schema = Joi.object()
  .keys({
    // Environment variables
    NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),

    // Server port
    PORT: Joi.number().default(3000),

    // Salt
    SALT: Joi.number().default(10),

    // MongoDB URL
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),

    // JWT
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire')
  })
  .unknown();

// Validate environment variables
const { value: env_variable_value, error } = env_variables_schema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

// Throw error if validation fails
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// environment variables object:
const cnf_env_variables = {
  // mode:
  env_mode: env_variable_value.NODE_ENV,

  // port:
  env_port: env_variable_value.PORT,

  // salt:
  env_salt: env_variable_value.SALT,

  // MongoDB URL:
  env_mongoose_url: env_variable_value.MONGODB_URL,

  // JWT configuration:
  env_jwt: {
    secret: env_variable_value.JWT_SECRET,
    access_expiration_minutes: env_variable_value.JWT_ACCESS_EXPIRATION_MINUTES,
    refresh_expiration_days: env_variable_value.JWT_REFRESH_EXPIRATION_DAYS
  }
};

export default cnf_env_variables;
