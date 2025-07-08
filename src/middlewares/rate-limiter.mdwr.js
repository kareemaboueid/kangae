import rateLimit from 'express-rate-limit';

/**
 * Rate Limiter Middleware
 * @description Limits repeated requests to public APIs and endpoints
 */
const mdwr_rate_limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  skipSuccessfulRequests: true
});

export default mdwr_rate_limiter;
