import express from 'express';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import { xss } from 'express-xss-sanitizer';
import compression from 'compression';
import cors from 'cors';
import httpStatus from 'http-status';

// Importing configurations and middlewares:
import cnf_env_variables from './configs/env-variables.cnf.js';
import cnf_morgan_messager from './configs/morgan.cnf.js';
import mdwr_rate_limiter from './middlewares/rate-limiter.mdwr.js';
import mdwr_error_converter from './middlewares/error-converter.mdwr.js';
import mdwr_error_handler from './middlewares/error-handler.mdwr.js';
import Utl_Api_Error from './utilities/Api-error.utl.js';
import verifyShortToken from './configs/jwt.cnf.js';

import route_v1 from './routes/v1/index-v1.js';

// initialize express app:
const kangae_app = express();

// use morgan for logging requests:
kangae_app.use(cnf_morgan_messager.success);
kangae_app.use(cnf_morgan_messager.error);

// set security HTTP headers:
kangae_app.use(helmet());

// parse json request body:
kangae_app.use(express.json());

// parse urlencoded request body:
kangae_app.use(express.urlencoded({ extended: true }));

// sanitize request data:
kangae_app.use(xss());
kangae_app.use(mongoSanitize());

// gzip compression:
kangae_app.use(compression());

// enable cors:
kangae_app.use(cors());
kangae_app.options('*', cors());

// initialize getting token from request header auth as bearer token:
kangae_app.use((req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    const token = req.headers.authorization.split(' ')[1];
    try {
      req.tokenPayload = verifyShortToken(token);
    } catch (error) {
      return res.status(error.statusCode || 500).json({ message: error.message });
    }
  } else {
    req.tokenPayload = null;
  }
  next();
});


// apply rate limiting to auth endpoints on production:
if (cnf_env_variables.env_mode === 'production') {
  kangae_app.use('/v1/auth', mdwr_rate_limiter);
}

// v1 APIs: `/v1`
kangae_app.use('/v1', route_v1);

// send back a 404 error for any unknown api request:
kangae_app.use((p_request, p_response, p_next) => {
  p_next(new Utl_Api_Error(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to Utl_Api_Error, if needed:
kangae_app.use(mdwr_error_converter);

// handle error:
kangae_app.use(mdwr_error_handler);

export default kangae_app;
