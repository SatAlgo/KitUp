const User = require('../models/User');

// Get current user profile
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        next(err);
    }
};

// Update user details
exports.updateMe = async (req, res, next) => {
    try {
        const { name, phoneNumber } = req.body;

        // Filter out unwanted fields (email, year, password, etc.)
        const fieldsToUpdate = {};
        if (name) fieldsToUpdate.name = name;
        if (phoneNumber) fieldsToUpdate.phoneNumber = phoneNumber;

        const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (err) {
        next(err);
    }
};
