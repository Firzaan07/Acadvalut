const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Admin who made the assignment
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    department: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Each student can only be assigned once per faculty/subject combination
assignmentSchema.index({ student: 1, faculty: 1, subject: 1 }, { unique: true });

module.exports = mongoose.model('Assignment', assignmentSchema);
