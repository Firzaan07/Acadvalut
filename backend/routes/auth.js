const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');
const { protect } = require('../middleware/auth');
const { verifyFirebaseToken } = require('../config/firebase');

/**
 * Helper: Generate signed JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

/**
 * Helper: Log activity to DB
 */
const logActivity = async (userId, userName, actionType, message, module = 'Auth', severity = 'info') => {
  try {
    await ActivityLog.create({ 
      user: userId, 
      userName, 
      action: actionType, // Legacy field
      actionType, 
      message, 
      module, 
      severity 
    });
  } catch (e) {
    console.error('Activity log error:', e.message);
  }
};

// ─────────────────────────────────────────────
// POST /api/auth/signup
// Register a new user account
// ─────────────────────────────────────────────
router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Validate required fields
    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide full name, email and password.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    }

    // Create the new user (password is hashed by the pre-save hook in User model)
    const user = await User.create({ fullName, email: email.toLowerCase(), password });

    // Log this signup event
    await logActivity(user._id, user.fullName, 'USER_SIGNUP', `New account created for ${email}`, 'Auth', 'success');

    // Generate JWT token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profileCompleted: user.profileCompleted,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Registration failed. Please try again.' });
  }
});

// ─────────────────────────────────────────────
// POST /api/auth/login
// Authenticate an existing user
// ─────────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    // Find the user, explicitly including password (select: false in schema)
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    // Compare provided password against stored hash
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    // Update last login timestamp
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    await logActivity(user._id, user.fullName, 'USER_LOGIN', `User ${user.fullName} logged in`, 'Auth', 'info');

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        department: user.department,
        employeeId: user.employeeId,
        studentId: user.studentId,
        academicYear: user.academicYear,
        organization: user.organization,
        profileCompleted: user.profileCompleted,
        status: user.status,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed. Please try again.' });
  }
});

// ─────────────────────────────────────────────
// GET /api/auth/me
// Get currently authenticated user profile
// ─────────────────────────────────────────────
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not fetch profile.' });
  }
});

// ─────────────────────────────────────────────
// PUT /api/auth/select-role
// Set/update user role after signup
// ─────────────────────────────────────────────
router.put('/select-role', protect, async (req, res) => {
  try {
    const { role } = req.body;

    if (!['admin', 'faculty', 'student'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role. Must be admin, faculty, or student.' });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { role },
      { new: true, runValidators: true }
    );

    await logActivity(user._id, user.fullName, 'ROLE_SELECTED', `User selected role: ${role}`, 'Auth', 'info');

    res.status(200).json({ success: true, message: `Role set to ${role}`, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update role.' });
  }
});

// ─────────────────────────────────────────────
// PUT /api/auth/complete-profile
// Complete profile setup after role selection
// ─────────────────────────────────────────────
router.put('/complete-profile', protect, async (req, res) => {
  try {
    const { fullName, email, department, employeeId, studentId, academicYear, organization, designation, specialization, rollNumber, semester } = req.body;

    const updateData = {
      fullName,
      email,
      department,
      employeeId,
      studentId,
      academicYear,
      organization,
      designation,
      specialization,
      rollNumber,
      semester,
      profileCompleted: true,
    };

    // Remove undefined/null fields to avoid overwriting with empty values
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined || updateData[key] === null || updateData[key] === '') {
        delete updateData[key];
      }
    });

    const user = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
      runValidators: true,
    });

    await logActivity(user._id, user.fullName, 'PROFILE_COMPLETED', `Profile completed for role: ${user.role}`, 'Auth', 'success');

    res.status(200).json({ success: true, message: 'Profile updated successfully.', user });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ success: false, message: 'Failed to update profile.' });
  }
});

// ─────────────────────────────────────────────
// POST /api/auth/google
// Firebase Google Sign-In bridge:
// 1. Client signs in via Firebase (Google popup)
// 2. Client sends Firebase ID token to this endpoint
// 3. We verify the token with Firebase Admin SDK
// 4. We find or create the user in MongoDB
// 5. We return our own JWT + user profile
// ─────────────────────────────────────────────
router.post('/google', async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: 'Firebase ID token is required.',
      });
    }

    // Step 1: Verify the Firebase ID token with Firebase Admin SDK
    let decoded;
    try {
      decoded = await verifyFirebaseToken(idToken);
    } catch (firebaseError) {
      return res.status(401).json({
        success: false,
        message: firebaseError.message || 'Firebase authentication failed.',
      });
    }

    // Extract user info from the verified Google token
    const { uid: firebaseUid, email, name: fullName, picture: photoURL } = decoded;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Google account must have an email address.',
      });
    }

    // Step 2: Find existing user by email OR create a new one
    let user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      // Existing user — update their last login and Google UID if not set
      user.lastLogin = new Date();
      if (!user.googleUid) user.googleUid = firebaseUid;
      if (!user.photoURL && photoURL) user.photoURL = photoURL;
      await user.save({ validateBeforeSave: false });

      await logActivity(user._id, user.fullName, 'GOOGLE_LOGIN', `Google Sign-In for ${email}`, 'Auth', 'info');
    } else {
      // New user — create their account (no password needed for Google auth)
      user = await User.create({
        fullName: fullName || email.split('@')[0],
        email: email.toLowerCase(),
        googleUid: firebaseUid,
        photoURL: photoURL || null,
        password: `firebase_google_${firebaseUid}_${Date.now()}`, // Placeholder, never used for login
        profileCompleted: false,
        status: 'Active',
      });

      await logActivity(user._id, user.fullName, 'GOOGLE_SIGNUP', `New account via Google for ${email}`, 'Auth', 'success');
    }

    // Step 3: Issue our own JWT token (same format as email/password login)
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: user.profileCompleted ? 'Google Sign-In successful.' : 'Google account linked. Please complete your profile.',
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        photoURL: user.photoURL,
        department: user.department,
        employeeId: user.employeeId,
        studentId: user.studentId,
        academicYear: user.academicYear,
        organization: user.organization,
        profileCompleted: user.profileCompleted,
        status: user.status,
        isGoogleUser: true,
      },
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Google authentication failed. Please try again.',
    });
  }
});

module.exports = router;
