const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        lowercase: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@mitaoe\.ac\.in$/,
            'Please use a valid @mitaoe.ac.in email address'
        ]
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please add a phone number'],
        match: [
            /^[6-9]\d{9}$/,
            'Please add a valid Indian phone number'
        ]
    },
    password: {
        type: String,
        required: function () {
            return this.authProvider === 'LOCAL';
        },
        minlength: 8,
        select: false
    },
    year: {
        type: Number
    },
    prn: {
        type: String,
        unique: true,
        sparse: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    authProvider: {
        type: String,
        enum: ['LOCAL', 'GOOGLE'],
        default: 'LOCAL'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    verificationToken: String,
    verificationTokenExpire: Date
}, {
    timestamps: true
});

// Calculate Year and Hash Password before saving
userSchema.pre('save', async function () {
    // Calculate Year from Email
    if (this.isModified('email')) {
        // Extract PRN
        if (this.email.endsWith('@mitaoe.ac.in')) {
            this.prn = this.email.split('@')[0];
        }

        const emailRegex = /^(\d{4})/;
        const match = this.email.match(emailRegex);

        if (match && match[1]) {
            const admissionYear = parseInt(match[1], 10);
            const currentYear = new Date().getFullYear();
            let calculatedYear = (currentYear + 1) - admissionYear;

            if (calculatedYear < 1) calculatedYear = 1;
            if (calculatedYear > 4) calculatedYear = 4;

            this.year = calculatedYear;
        } else {
            this.year = 0;
        }
    }

    // Hash Password
    if (!this.isModified('password')) {
        return;
    }

    if (this.password) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password reset token
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

// Generate and hash email verification token
userSchema.methods.getVerificationToken = function () {
    const verificationToken = crypto.randomBytes(20).toString('hex');

    this.verificationToken = crypto
        .createHash('sha256')
        .update(verificationToken)
        .digest('hex');

    this.verificationTokenExpire = Date.now() + 24 * 60 * 60 * 1000;

    return verificationToken;
};

module.exports = mongoose.model('User', userSchema);
