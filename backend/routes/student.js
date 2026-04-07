const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Mark = require('../models/Mark');
const Attendance = require('../models/Attendance');
const Remark = require('../models/Remark');
const Subject = require('../models/Subject');
const { protect, authorize } = require('../middleware/auth');

// All student routes require authentication + student role
router.use(protect, authorize('student'));

// ─────────────────────────────────────────────
// GET /api/student/profile
// Get student's own profile
// ─────────────────────────────────────────────
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch profile.' });
  }
});

// ─────────────────────────────────────────────
// PUT /api/student/profile
// Update student profile
// ─────────────────────────────────────────────
router.put('/profile', async (req, res) => {
  try {
    const { fullName, department, academicYear } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { fullName, department, academicYear },
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({ success: true, message: 'Profile updated.', data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update profile.' });
  }
});

// ─────────────────────────────────────────────
// GET /api/student/marks
// Get all marks for the authenticated student
// ─────────────────────────────────────────────
router.get('/marks', async (req, res) => {
  try {
    const marks = await Mark.find({ student: req.user._id })
      .populate('subject', 'name code credits semester department')
      .populate('faculty', 'fullName employeeId')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: marks });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch marks.' });
  }
});

// ─────────────────────────────────────────────
// GET /api/student/attendance
// Get all attendance records for the authenticated student
// ─────────────────────────────────────────────
router.get('/attendance', async (req, res) => {
  try {
    const records = await Attendance.find({ student: req.user._id })
      .populate('subject', 'name code')
      .populate('faculty', 'fullName')
      .sort({ date: -1 });

    // Calculate summary stats per subject
    const subjectMap = {};
    records.forEach((r) => {
      const subjectId = r.subject?._id?.toString() || 'general';
      const subjectName = r.subject?.name || 'General';
      if (!subjectMap[subjectId]) {
        subjectMap[subjectId] = { subjectId, subjectName, total: 0, present: 0, absent: 0, late: 0 };
      }
      subjectMap[subjectId].total++;
      if (r.status === 'Present') subjectMap[subjectId].present++;
      else if (r.status === 'Absent') subjectMap[subjectId].absent++;
      else if (r.status === 'Late') subjectMap[subjectId].late++;
    });

    const summary = Object.values(subjectMap).map((s) => ({
      ...s,
      percentage: s.total > 0 ? ((s.present / s.total) * 100).toFixed(1) : '0.0',
    }));

    res.status(200).json({ success: true, data: records, summary });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch attendance.' });
  }
});

// ─────────────────────────────────────────────
// GET /api/student/remarks
// Get all remarks for the authenticated student
// ─────────────────────────────────────────────
router.get('/remarks', async (req, res) => {
  try {
    const remarks = await Remark.find({ student: req.user._id })
      .populate('faculty', 'fullName employeeId department')
      .populate('subject', 'name code')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: remarks });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch remarks.' });
  }
});

// ─────────────────────────────────────────────
// GET /api/student/subjects
// Get subjects enrolled by the student
// ─────────────────────────────────────────────
router.get('/subjects', async (req, res) => {
  try {
    const subjects = await Subject.find({ enrolledStudents: req.user._id, isActive: true })
      .populate('faculty', 'fullName employeeId designation')
      .sort({ semester: 1 });

    res.status(200).json({ success: true, data: subjects });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch subjects.' });
  }
});

// ─────────────────────────────────────────────
// GET /api/student/subjects/available
// Get all available subjects NOT yet enrolled
// ─────────────────────────────────────────────
router.get('/subjects/available', async (req, res) => {
  try {
    const subjects = await Subject.find({
      enrolledStudents: { $ne: req.user._id },
      isActive: true,
    }).populate('faculty', 'fullName employeeId');

    res.status(200).json({ success: true, data: subjects });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch available subjects.' });
  }
});

// ─────────────────────────────────────────────
// POST /api/student/enroll
// Enroll in a subject
// ─────────────────────────────────────────────
router.post('/enroll', async (req, res) => {
  try {
    const { subjectId } = req.body;
    if (!subjectId) return res.status(400).json({ success: false, message: 'Subject ID is required.' });

    const subject = await Subject.findById(subjectId);
    if (!subject) return res.status(404).json({ success: false, message: 'Subject not found.' });
    if (!subject.isActive) return res.status(400).json({ success: false, message: 'This subject is no longer active.' });

    // Check if already enrolled
    if (subject.enrolledStudents.includes(req.user._id)) {
      return res.status(409).json({ success: false, message: 'You are already enrolled in this subject.' });
    }

    // Add student to subject's enrolled list
    subject.enrolledStudents.push(req.user._id);
    await subject.save();

    res.status(200).json({ success: true, message: `Successfully enrolled in ${subject.name}.`, data: subject });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Enrollment failed.' });
  }
});

module.exports = router;
