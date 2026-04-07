const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String, trim: true },
    action: { type: String, required: true },
    actionType: { type: String, required: true }, // e.g., 'STUDENT_ASSIGNED', 'LOGIN'
    message: { type: String, required: true },
    module: { 
      type: String, 
      enum: ['Admin', 'Faculty', 'Student', 'Auth'],
      required: true 
    },
    targetUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    targetModel: { type: String },
    targetId: { type: mongoose.Schema.Types.ObjectId },
    details: { type: String },
    severity: {
      type: String,
      enum: ['info', 'warning', 'error', 'success'],
      default: 'info',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ActivityLog', activityLogSchema);
