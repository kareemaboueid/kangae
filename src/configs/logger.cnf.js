import winston from 'winston';
import cnf_env_variables from './env-variables.cnf.js';

// This format enumerates errors by converting them to a string representation
const enumerate_error_format = winston.format((p_info) => {
  if (p_info instanceof Error) {
    Object.assign(p_info, { message: p_info.stack });
  }
  return p_info;
});

/**
 * logger configuration using Winston
 * @description This logger is configured to log messages to the console
 */
const cnf_logger = winston.createLogger({
  // Set the logging level based on the environment
  level: cnf_env_variables.env_mode === 'development' ? 'debug' : 'info',

  // Define the format of the log messages
  format: winston.format.combine(
    enumerate_error_format(),
    cnf_env_variables.env_mode === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),

  // Define the transports for logging
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error']
    })
  ]
});

export default cnf_logger;
