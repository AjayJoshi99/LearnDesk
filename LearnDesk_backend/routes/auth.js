const express = require('express');
const router = express.Router();
const { requestOtp, verifyOtp, loginUser  } = require('../controller/authController');
const { requestPasswordOtp, resetPassword, verifyPasswordOtp } = require('../controller/authController');
const { otpRequestLimiter } = require('../middleware/rateLimiter');

// POST /api/auth/request-otp
router.post('/request-otp', otpRequestLimiter, requestOtp);
router.post('/verify-otp', verifyOtp);
router.post('/login', loginUser);
router.post('/forgot-password', requestPasswordOtp);
router.post('/reset-password', resetPassword);
router.post("/verify-password-otp", verifyPasswordOtp);


module.exports = router;
