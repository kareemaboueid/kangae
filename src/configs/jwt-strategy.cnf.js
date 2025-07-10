import { Strategy, ExtractJwt } from 'passport-jwt';
import cnf_env_variables from './env-variables.cnf.js';
import env_token_types from '../enums/token-types.enum.js';
import model_user from '../models/user.model.js';

// token options
const jwt_options = {
  secretOrKey: cnf_env_variables.env_jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

// JWT verification function
const jwt_verify = async (p_payload, p_done) => {
  try {
    // Check if the token type is valid
    if (p_payload.type !== env_token_types.access) {
      throw new Error('Invalid token type');
    }

    // Find the user by ID from the payload
    const user = await model_user.findById(p_payload.sub);

    // If the user does not exist, return false
    if (!user) {
      return p_done(null, false);
    }

    // If the user exists, return the user object
    p_done(null, user);
  } catch (error) {
    // Handle any errors that occur during the verification process
    p_done(error, false);
  }
};

const cnf_jwt_strategy = new Strategy(jwt_options, jwt_verify);

export default cnf_jwt_strategy;
