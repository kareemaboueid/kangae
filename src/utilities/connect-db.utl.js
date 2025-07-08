import mongoose from 'mongoose';
import cnf_logger from '../configs/logger.cnf.js';

/**
 * Connects to the MongoDB database using Mongoose.
 * @param {string} P_mongoose_url - The MongoDB connection string.
 * @returns {Promise<mongoose.Connection>} The Mongoose connection object.
 */
const utl_connect_db = async (P_mongoose_url) => {
  // Check if the mongoose URL is provided:
  if (!P_mongoose_url) {
    cnf_logger.error('Mongoose URL is not provided');
  }

  // check if the mongoose URL is a string:
  if (typeof P_mongoose_url !== 'string') {
    cnf_logger.error('Mongoose URL must be a string');
  }

  try {
    // Connect to MongoDB using Mongoose:
    const connection = await mongoose.connect(P_mongoose_url);

    // get the database information from the connection:
    let db_info = {
      host: connection?.connection?.host,
      port: connection?.connection?.port,
      db: connection?.connection?.name
    };

    // transform the db_info to JSON:
    db_info = JSON.stringify(db_info);

    // Log the connection information:
    cnf_logger.info(`Connected to MongoDB: ${db_info}`);

    // Return the connection object
    return connection;

    // ---
  } catch (error) {
    cnf_logger.error('Error connecting to MongoDB:', error);

    // stop the db connection and exit the process:
    await mongoose.disconnect();
    cnf_logger.error('Disconnected from MongoDB');
    process.exit(1);
  }
};

export default utl_connect_db;
