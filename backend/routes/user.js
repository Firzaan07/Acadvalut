const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// All user profile routes require authentication
router.use(protect);

// ─────────────────────────────────────────────
// PUT /api/user/profile
// General profile update (any role)
// ─────────────────────────────────────────────
router.put('/profile', async (req, res) => {
  try {
    // Only allow safe fields to be updated
    const allowedUpdates = [
      'fullName', 'department', 'employeeId', 'studentId',
      'academicYear', 'organization', 'designation', 'specialization',
      'rollNumber', 'semester'
    ];

    const updateData = {};
    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    res.status(200).json({ success: true, message: 'Profile updated successfully.', user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update profile.' });
  }
});

// ─────────────────────────────────────────────
// PUT /api/user/change-password
// Change password for authenticated user
// ─────────────────────────────────────────────
router.put('/change-password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Please provide current and new password.' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters.' });
    }

    const user = await User.findById(req.user._id).select('+password');
    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect.' });
    }

    user.password = newPassword; // Pre-save hook will hash it
    await user.save();

    res.status(200).json({ success: true, message: 'Password changed successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to change password.' });
  }
});

module.exports = router;
