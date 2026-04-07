const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Mark = require('../models/Mark');
const Attendance = require('../models/Attendance');
const Remark = require('../models/Remark');
const Assignment = require('../models/Assignment');
const { protect, authorize } = require('../middleware/auth');

// All faculty routes require authentication + faculty role
router.use(protect, authorize('faculty'));

// ─────────────────────────────────────────────
// GET /api/faculty/students
// Get all students assigned to this faculty
// ─────────────────────────────────────────────
router.get('/students', async (req, res) => {
  try {
    // Get assignments for this faculty member
    const assignments = await Assignment.find({ faculty: req.user._id, isActive: true })
      .populate('student', '-password')
      .populate('subject', 'name code semester');

    const students = assignments.map((a) => ({
      ...a.student.toJSON(),
      assignedSubject: a.subject,
      assignmentId: a._id,
    }));

    // Deduplicate students (a student can be in multiple assignments)
    const uniqueStudents = students.reduce((acc, s) => {
      if (!acc.find((x) => x._id.toString() === s._id.toString())) acc.push(s);
      return acc;
    }, []);

    // Also return all students in the same department if no assignments
    if (uniqueStudents.length === 0 && req.user.department) {
      const deptStudents = await User.find({
        role: 'student',
        department: req.user.department,
      }).select('-password');
      return res.status(200).json({ success: true, data: deptStudents, total: deptStudents.length });
    }

    res.status(200).json({ success: true, data: uniqueStudents, total: uniqueStudents.length });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch assigned students.' });
  }
});

// ─────────────────────────────────────────────
// GET /api/faculty/marks/:studentId
// Get marks for a specific student
// ─────────────────────────────────────────────
router.get('/marks/:studentId', async (req, res) => {
  try {
    const marks = await Mark.find({
      student: req.params.studentId,
      faculty: req.user._id,
    }).populate('subject', 'name code');

    res.status(200).json({ success: true, data: marks });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch marks.' });
  }
});

// ─────────────────────────────────────────────
// PUT /api/faculty/marks/:studentId
// Update/create marks for a specific student
// ─────────────────────────────────────────────
router.put('/marks/:studentId', async (req, res) => {
  try {
    const { subjectId, internalMarks, externalMarks, semester, academicYear } = req.body;

    // Verify the student exists
    const student = await User.findOne({ _id: req.params.studentId, role: 'student' });
    if (!student) return res.status(404).json({ success: false, message: 'Student not found.' });

    // Upsert: update if exists, create if not
    const mark = await Mark.findOneAndUpdate(
      { student: req.params.studentId, subject: subjectId, faculty: req.user._id },
      { internalMarks, externalMarks, semester, academicYear },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({ success: true, message: 'Marks updated successfully.', data: mark });
  } catch (error) {
    console.error('Update marks error:', error);
    res.status(500).json({ success: false, message: 'Failed to update marks.' });
  }
});

// ─────────────────────────────────────────────
// PUT /api/faculty/attendance/:studentId
// Mark attendance for a specific student
// ─────────────────────────────────────────────
router.put('/attendance/:studentId', async (req, res) => {
  try {
    const { subjectId, status, date, semester, academicYear } = req.body;

    if (!['Present', 'Absent', 'Late', 'Excused'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid attendance status.' });
    }

    const attendanceDate = date ? new Date(date) : new Date();
    // Normalize to start of day to prevent duplicates on same day
    attendanceDate.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOneAndUpdate(
      { student: req.params.studentId, subject: subjectId, date: attendanceDate },
      { status, faculty: req.user._id, semester, academicYear },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({ success: true, message: 'Attendance recorded.', data: attendance });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'Attendance for this date already recorded.' });
    }
    res.status(500).json({ success: false, message: 'Failed to record attendance.' });
  }
});

// ─────────────────────────────────────────────
// POST /api/faculty/remarks/:studentId
// Add a remark for a student
// ─────────────────────────────────────────────
router.post('/remarks/:studentId', async (req, res) => {
  try {
    const { remark, type, subjectId, semester, academicYear } = req.body;

    if (!remark || remark.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Remark content is required.' });
    }

    const student = await User.findOne({ _id: req.params.studentId, role: 'student' });
    if (!student) return res.status(404).json({ success: false, message: 'Student not found.' });

    const newRemark = await Remark.create({
      student: req.params.studentId,
      faculty: req.user._id,
      subject: subjectId || null,
      remark: remark.trim(),
      type: type || 'General',
      semester,
      academicYear,
    });

    const populated = await newRemark.populate('faculty', 'fullName employeeId');
    res.status(201).json({ success: true, message: 'Remark added successfully.', data: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add remark.' });
  }
});

// ─────────────────────────────────────────────
// GET /api/faculty/profile
// Get faculty profile
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
// PUT /api/faculty/profile
// Update faculty profile
// ─────────────────────────────────────────────
router.put('/profile', async (req, res) => {
  try {
    const { fullName, department, designation, specialization } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { fullName, department, designation, specialization },
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({ success: true, message: 'Profile updated.', data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update profile.' });
  }
});

module.exports = router;
