const mongoose = require('mongoose');

const remarkSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    remark: { type: String, required: true, trim: true, maxlength: 500 },
    type: {
      type: String,
      enum: ['Academic', 'Behavioral', 'Achievement', 'General'],
      default: 'General',
    },
    semester: { type: Number },
    academicYear: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Remark', remarkSchema);
