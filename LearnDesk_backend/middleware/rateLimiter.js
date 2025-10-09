const rateLimit = require('express-rate-limit');

const otpRequestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: 'Too many OTP requests from this IP, please try again later.',
});

module.exports = { otpRequestLimiter };
