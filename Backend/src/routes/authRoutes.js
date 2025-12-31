const express = require('express');
const {
    register,
    login,
    verifyEmail,
    forgotPassword,
    resetPassword,
    googleAuth,
    googleCallback
} = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);

module.exports = router;
