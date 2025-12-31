const crypto = require('crypto');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const generateToken = require('../utils/generateToken');
const { OAuth2Client } = require('google-auth-library');

const { getVerificationEmail, getResetPasswordEmail } = require('../templates/emailTemplates');

// Register User
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, phoneNumber } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
                errorCode: 'AUTH_USER_EXISTS'
            });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            phoneNumber
        });

        // Create verification token
        const verificationToken = user.getVerificationToken();
        await user.save({ validateBeforeSave: false });

        // Create verification URL
        const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

        const message = getVerificationEmail(verifyUrl);

        try {
            await sendEmail({
                email: user.email,
                subject: 'Welcome to SetUp - Verify Your Email',
                html: message
            });

            res.status(201).json({
                success: true,
                message: 'User registered. Please check your email to verify account.',
                data: null
            });
        } catch (err) {
            user.verificationToken = undefined;
            user.verificationTokenExpire = undefined;
            await user.save({ validateBeforeSave: false });

            return res.status(500).json({
                success: false,
                message: 'Email could not be sent',
                errorCode: 'AUTH_EMAIL_SEND_FAIL'
            });
        }
    } catch (err) {
        next(err);
    }
};

// Login User (unchanged)
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an email and password',
                errorCode: 'AUTH_MISSING_CREDENTIALS'
            });
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
                errorCode: 'AUTH_INVALID_CREDENTIALS'
            });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
                errorCode: 'AUTH_INVALID_CREDENTIALS'
            });
        }

        // Check if verified
        if (!user.isVerified) {
            return res.status(401).json({
                success: false,
                message: 'Please verify your email first',
                errorCode: 'AUTH_NOT_VERIFIED'
            });
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        next(err);
    }
};

// Verify Email (unchanged)
exports.verifyEmail = async (req, res, next) => {
    try {
        // Get token from params (or body if frontend sends it)
        // The route will be /verify-email/:token or POST /verify-email { token }
        // Let's support POST as per plan
        const token = req.body.token || req.params.token;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Invalid token',
                errorCode: 'AUTH_INVALID_TOKEN'
            });
        }

        const verificationToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        const user = await User.findOne({
            verificationToken,
            verificationTokenExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired token',
                errorCode: 'AUTH_INVALID_TOKEN'
            });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpire = undefined;
        await user.save();

        sendTokenResponse(user, 200, res);
    } catch (err) {
        next(err);
    }
};

// Forgot Password
exports.forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'There is no user with that email',
                errorCode: 'AUTH_USER_NOT_FOUND'
            });
        }

        // Get reset token
        const resetToken = user.getResetPasswordToken();

        await user.save({ validateBeforeSave: false });

        // Create reset url
        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        const message = getResetPasswordEmail(resetUrl);

        try {
            await sendEmail({
                email: user.email,
                subject: 'Password Reset Request - SetUp',
                html: message
            });

            res.status(200).json({
                success: true,
                message: 'Email sent'
            });
        } catch (err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save({ validateBeforeSave: false });

            return res.status(500).json({
                success: false,
                message: 'Email could not be sent',
                errorCode: 'AUTH_EMAIL_SEND_FAIL'
            });
        }
    } catch (err) {
        next(err);
    }
};

// Reset Password
exports.resetPassword = async (req, res, next) => {
    try {
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(req.body.token || req.params.token)
            .digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid token',
                errorCode: 'AUTH_INVALID_TOKEN'
            });
        }

        // Set new password
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        sendTokenResponse(user, 200, res);
    } catch (err) {
        next(err);
    }
};

// Get Current User (Moved to userController, but keeping helper here)

// Helper to send token response
const sendTokenResponse = (user, statusCode, res) => {
    const token = generateToken(user._id);

    const options = {
        expires: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
        ),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token,
            data: user
        });
};

// Google Auth (Placeholder for now, can be expanded)
exports.googleAuth = (req, res) => {
    // Redirect to Google OAuth URL
    // Implementation depends on using passport or manual URL construction
    // For now, returning a message
    res.status(501).json({ message: 'Google Auth not fully implemented yet' });
};

exports.googleCallback = (req, res) => {
    res.status(501).json({ message: 'Google Callback not fully implemented yet' });
};
