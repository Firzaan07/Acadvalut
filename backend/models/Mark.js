const mongoose = require('mongoose');

const markSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // Mark categories
    internalMarks: { type: Number, default: 0, min: 0, max: 50 },
    externalMarks: { type: Number, default: 0, min: 0, max: 50 },
    totalMarks: { type: Number, default: 0 },
    grade: { type: String, enum: ['O', 'A+', 'A', 'B+', 'B', 'C', 'F', 'N/A'], default: 'N/A' },
    semester: { type: Number },
    academicYear: { type: String },
    remarks: { type: String, trim: true },
  },
  { timestamps: true }
);

// Auto-calculate total and grade before saving
markSchema.pre('save', function (next) {
  this.totalMarks = (this.internalMarks || 0) + (this.externalMarks || 0);
  const total = this.totalMarks;
  if (total >= 90) this.grade = 'O';
  else if (total >= 80) this.grade = 'A+';
  else if (total >= 70) this.grade = 'A';
  else if (total >= 60) this.grade = 'B+';
  else if (total >= 50) this.grade = 'B';
  else if (total >= 40) this.grade = 'C';
  else if (total > 0) this.grade = 'F';
  next();
});

module.exports = mongoose.model('Mark', markSchema);
