const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: function () {
        // Password not required for Google-authenticated users
        return !this.googleUid;
      },
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Never include password in query results by default
    },
    // Google / Firebase Auth fields
    googleUid: { type: String, sparse: true }, // Firebase UID from Google Sign-In
    photoURL: { type: String },               // Profile picture URL from Google
    role: {
      type: String,
      enum: ['admin', 'faculty', 'student', null],
      default: null,
    },
    // Admin fields
    organization: { type: String, trim: true },
    // Faculty fields
    department: { type: String, trim: true },
    employeeId: { type: String, trim: true },
    designation: { type: String, trim: true },
    specialization: { type: String, trim: true },
    // Student fields
    studentId: { type: String, trim: true },
    rollNumber: { type: String, trim: true },
    academicYear: { type: String, trim: true },
    semester: { type: Number },
    gpa: { type: Number, default: 0.0 },
    status: {
      type: String,
      enum: ['Active', 'On Leave', 'Graduated', 'Retired'],
      default: 'Active',
    },
    profileCompleted: { type: Boolean, default: false },
    lastLogin: { type: Date },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Instance method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove sensitive fields when converting to JSON
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);
