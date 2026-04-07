const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Assignment = require('../models/Assignment');
const Subject = require('../models/Subject');
const ActivityLog = require('../models/ActivityLog');
const { protect, authorize } = require('../middleware/auth');

/**
 * Helper: Log activity to DB
 */
const logActivity = async (userId, userName, actionType, message, module = 'Admin', severity = 'info') => {
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

// All admin routes require authentication + admin role
router.use(protect, authorize('admin'));

// ─────────────────────────────────────────────
// GET /api/admin/stats
// Dashboard statistics summary
// ─────────────────────────────────────────────
router.get('/stats', async (req, res) => {
  try {
    const [totalStudents, totalFaculty, totalAdmins, activeStudents, recentLogs] = await Promise.all([
      User.countDocuments({ role: 'student' }),
      User.countDocuments({ role: 'faculty' }),
      User.countDocuments({ role: 'admin' }),
      User.countDocuments({ role: 'student', status: 'Active' }),
      ActivityLog.find().sort({ createdAt: -1 }).limit(10).populate('user', 'fullName email role'),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        totalFaculty,
        totalAdmins,
        activeStudents,
        recentActivity: recentLogs,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch statistics.' });
  }
});

// ─────────────────────────────────────────────
// GET /api/admin/students
// Get all students
// ─────────────────────────────────────────────
router.get('/students', async (req, res) => {
  try {
    const { search, status, department, page = 1, limit = 50 } = req.query;
    const query = { role: 'student' };

    if (status) query.status = status;
    if (department) query.department = new RegExp(department, 'i');
    if (search) {
      query.$or = [
        { fullName: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
        { studentId: new RegExp(search, 'i') },
        { rollNumber: new RegExp(search, 'i') },
        { department: new RegExp(search, 'i') },
      ];
    }

    const skip = (page - 1) * limit;
    const [students, total] = await Promise.all([
      User.find(query).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
      User.countDocuments(query),
    ]);

    res.status(200).json({ success: true, data: students, total, page: Number(page), limit: Number(limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch students.' });
  }
});

// ─────────────────────────────────────────────
// POST /api/admin/students
// Enroll a new student (admin only)
// ─────────────────────────────────────────────
router.post('/students', async (req, res) => {
  try {
    const { 
      fullName, 
      email, 
      studentId, 
      department, 
      academicYear, 
      semester, 
      gpa, 
      status 
    } = req.body;

    // Basic validation
    if (!fullName || !email || !studentId || !department || !semester) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields: Full Name, Email, Student ID, Department, and Semester.' 
      });
    }

    // Check if studentId or email already exists
    const existingStudent = await User.findOne({ 
      $or: [{ email: email.toLowerCase() }, { studentId }] 
    });

    if (existingStudent) {
      const field = existingStudent.email === email.toLowerCase() ? 'Email' : 'Student ID';
      return res.status(400).json({ 
        success: false, 
        message: `${field} already exists in the system.` 
      });
    }

    // Create the student user
    // Note: In a real system, we might want to generate a random password and send it to the student.
    // For now, setting a default password 'Student@123' if not provided.
    const student = await User.create({
      fullName,
      email: email.toLowerCase(),
      studentId,
      department,
      academicYear,
      semester: Number(semester),
      gpa: Number(gpa) || 0,
      status: status || 'Active',
      role: 'student',
      password: 'Student@123', // Hardcoded default password for manually enrolled students
      profileCompleted: true
    });

    // Log the action
    await logActivity(
      req.user._id, 
      req.user.fullName, 
      'STUDENT_ENROLLED', 
      `Admin enrolled student ${fullName} (${studentId})`, 
      'Admin', 
      'success'
    );

    res.status(201).json({
      success: true,
      message: 'Student enrolled successfully.',
      data: student
    });
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({ success: false, message: 'Failed to enroll student.' });
  }
});

// ─────────────────────────────────────────────
// GET /api/admin/faculty
// Get all faculty members
// ─────────────────────────────────────────────
router.get('/faculty', async (req, res) => {
  try {
    const { search, status, department } = req.query;
    const query = { role: 'faculty' };

    if (status) query.status = status;
    if (department) query.department = new RegExp(department, 'i');
    if (search) {
      query.$or = [
        { fullName: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
        { employeeId: new RegExp(search, 'i') },
        { specialization: new RegExp(search, 'i') },
      ];
    }

    const faculty = await User.find(query).sort({ fullName: 1 });
    res.status(200).json({ success: true, data: faculty, total: faculty.length });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch faculty.' });
  }
});

// ─────────────────────────────────────────────
// POST /api/admin/faculty
// Recruit a new faculty member (admin only)
// ─────────────────────────────────────────────
router.post('/faculty', async (req, res) => {
  try {
    const { 
      fullName, 
      email, 
      employeeId, 
      department, 
      designation, 
      specialization, 
      status,
      joiningDate 
    } = req.body;

    // Basic validation
    if (!fullName || !email || !employeeId || !department || !designation) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields: Full Name, Email, Employee ID, Department, and Role.' 
      });
    }

    // Check if employeeId or email already exists
    const existingFaculty = await User.findOne({ 
      $or: [{ email: email.toLowerCase() }, { employeeId }] 
    });

    if (existingFaculty) {
      const field = existingFaculty.email === email.toLowerCase() ? 'Email' : 'Employee ID';
      return res.status(400).json({ 
        success: false, 
        message: `${field} already exists in the system.` 
      });
    }

    // Create the faculty user
    const faculty = await User.create({
      fullName,
      email: email.toLowerCase(),
      employeeId,
      department,
      designation,
      specialization,
      status: status || 'Active',
      role: 'faculty',
      password: 'Faculty@123', // Hardcoded default password for manual creation
      profileCompleted: true,
      joiningDate: joiningDate || new Date()
    });

    // Log the action
    await ActivityLog.create({
      user: req.user._id,
      userName: req.user.fullName,
      action: 'FACULTY_RECRUITED',
      actionType: 'FACULTY_RECRUITED',
      message: `Faculty ${fullName} recruited in ${department} department`,
      module: 'Admin',
      targetUser: faculty._id,
      severity: 'success',
    });

    res.status(201).json({ 
      success: true, 
      message: 'Faculty recruited successfully.', 
      data: faculty 
    });
  } catch (error) {
    console.error('Recruitment error:', error);
    res.status(500).json({ success: false, message: 'Failed to recruit faculty.' });
  }
});

// ─────────────────────────────────────────────
// POST /api/admin/assign
// Assign a student to a faculty member (Assignment model)
// ─────────────────────────────────────────────
router.post('/assign', async (req, res) => {
  try {
    const { studentId, facultyId, subjectId, department } = req.body;
    
    if (!studentId || !facultyId || !subjectId) {
      return res.status(400).json({ success: false, message: 'Student, Faculty, and Subject are required.' });
    }

    // Verify entities exist and have correct roles
    const [student, faculty, subject] = await Promise.all([
      User.findOne({ _id: studentId, role: 'student' }),
      User.findOne({ _id: facultyId, role: 'faculty' }),
      Subject.findById(subjectId)
    ]);

    if (!student) return res.status(404).json({ success: false, message: 'Student not found.' });
    if (!faculty) return res.status(404).json({ success: false, message: 'Faculty not found.' });
    if (!subject) return res.status(404).json({ success: false, message: 'Subject not found.' });

    // Check for existing assignment to prevent duplicates
    const existingAssignment = await Assignment.findOne({ 
      student: studentId, 
      faculty: facultyId, 
      subject: subjectId 
    });

    if (existingAssignment) {
      return res.status(400).json({ success: false, message: 'This assignment already exists.' });
    }

    // Create the assignment
    const assignment = await Assignment.create({
      student: studentId,
      faculty: facultyId,
      subject: subjectId,
      assignedBy: req.user._id,
      department: department || student.department
    });

    // Log the assignment action
    await ActivityLog.create({
      user: req.user._id,
      userName: req.user.fullName,
      action: 'STUDENT_ASSIGNED',
      actionType: 'STUDENT_ASSIGNED',
      message: `Student ${student.fullName} assigned to faculty ${faculty.fullName} for ${subject.name}`,
      module: 'Admin',
      targetUser: studentId,
      severity: 'success',
    });

    res.status(201).json({ 
      success: true, 
      message: `${student.fullName} has been assigned to ${faculty.fullName} for ${subject.name}.`,
      data: assignment 
    });
  } catch (error) {
    console.error('Assignment error:', error);
    res.status(500).json({ success: false, message: 'Assignment failed.' });
  }
});

// ─────────────────────────────────────────────
// PATCH /api/admin/assignments/:id
// Update an existing assignment (e.g., status, subject, faculty)
// ─────────────────────────────────────────────
router.patch('/assignments/:id', async (req, res) => {
  try {
    const { status, facultyId, subjectId, department } = req.body;
    const assignmentId = req.params.id;

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment record not found.' });
    }

    const updateData = {};
    if (status) updateData.status = status;
    if (facultyId) updateData.faculty = facultyId;
    if (subjectId) updateData.subject = subjectId;
    if (department) updateData.department = department;

    const updatedAssignment = await Assignment.findByIdAndUpdate(
      assignmentId,
      { $set: updateData },
      { new: true }
    ).populate('student faculty subject');

    // Log the update
    await ActivityLog.create({
      user: req.user._id,
      action: 'ASSIGNMENT_UPDATED',
      details: `Assignment ${assignmentId} updated by admin ${req.user.fullName}. New Status: ${status || assignment.status}`,
      severity: 'info',
    });

    res.status(200).json({
      success: true,
      message: 'Assignment updated successfully.',
      data: updatedAssignment
    });
  } catch (error) {
    console.error('Update assignment error:', error);
    res.status(500).json({ success: false, message: 'Failed to update assignment.' });
  }
});

// ─────────────────────────────────────────────
// DELETE /api/admin/assignments/:id
// Delete an assignment
// ─────────────────────────────────────────────
router.delete('/assignments/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment record not found.' });
    }

    // Log deletion
    await ActivityLog.create({
      user: req.user._id,
      action: 'ASSIGNMENT_DELETED',
      details: `Assignment ${req.params.id} deleted by admin ${req.user.fullName}.`,
      severity: 'warning',
    });

    res.status(200).json({ success: true, message: 'Assignment deleted successfully.' });
  } catch (error) {
    console.error('Delete assignment error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete assignment.' });
  }
});

// ─────────────────────────────────────────────
// GET /api/admin/assignments
// Get all assignments with populations
// ─────────────────────────────────────────────
router.get('/assignments', async (req, res) => {
  try {
    const { search, student, faculty, subject } = req.query;
    const query = {};

    // Basic filtering would go here if needed
    
    const assignments = await Assignment.find(query)
      .populate('student', 'fullName studentId email')
      .populate('faculty', 'fullName employeeId email')
      .populate('subject', 'name code')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: assignments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch assignments.' });
  }
});

// ─────────────────────────────────────────────
// GET /api/admin/subjects
// Get all subjects
// ─────────────────────────────────────────────
router.get('/subjects', async (req, res) => {
  try {
    const subjects = await Subject.find({ isActive: true }).sort({ name: 1 });
    res.status(200).json({ success: true, data: subjects });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch subjects.' });
  }
});

// ─────────────────────────────────────────────
// GET /api/admin/activities
// Get all activity logs with filtering
// ─────────────────────────────────────────────
router.get('/activities', async (req, res) => {
  try {
    const { module, search, limit = 50 } = req.query;
    const query = {};

    if (module) {
      query.module = module;
    }

    if (search) {
      query.$or = [
        { userName: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
        { actionType: { $regex: search, $options: 'i' } }
      ];
    }

    const logs = await ActivityLog.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    console.error('Fetch activities error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch activity logs.' });
  }
});

// ─────────────────────────────────────────────
// DELETE /api/admin/activities/clear
// Clear all activity logs (Admin only)
// ─────────────────────────────────────────────
router.delete('/activities/clear', async (req, res) => {
  try {
    await ActivityLog.deleteMany({});
    res.status(200).json({ success: true, message: 'All activity logs cleared.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to clear logs.' });
  }
});

// ─────────────────────────────────────────────
// DELETE /api/admin/users/:id
// Delete a user (admin only)
// ─────────────────────────────────────────────
router.delete('/users/:id', async (req, res) => {
  try {
    // Prevent admin from deleting their own account
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'You cannot delete your own account.' });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    await ActivityLog.create({
      user: req.user._id,
      action: 'USER_DELETED',
      details: `User ${user.fullName} (${user.role}) was deleted by admin ${req.user.fullName}`,
      severity: 'warning',
    });

    res.status(200).json({ success: true, message: `User ${user.fullName} has been removed from the system.` });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete user.' });
  }
});

// ─────────────────────────────────────────────
// PUT /api/admin/users/:id/status
// Update a user's status
// ─────────────────────────────────────────────
router.put('/users/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Active', 'On Leave', 'Graduated', 'Retired'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value.' });
    }

    const user = await User.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    res.status(200).json({ success: true, message: 'User status updated.', user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update status.' });
  }
});

// ─────────────────────────────────────────────
// GET /api/admin/activity
// Get system activity logs
// ─────────────────────────────────────────────
router.get('/activity', async (req, res) => {
  try {
    const { page = 1, limit = 30 } = req.query;
    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      ActivityLog.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .populate('user', 'fullName email role')
        .populate('targetUser', 'fullName email role'),
      ActivityLog.countDocuments(),
    ]);

    res.status(200).json({ success: true, data: logs, total });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch activity logs.' });
  }
});

module.exports = router;
