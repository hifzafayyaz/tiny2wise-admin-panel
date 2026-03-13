const mongoose = require("mongoose");

const principalSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    schoolName: {
      type: String,
      required: true,
      trim: true
    },
    officialEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    contactNumber: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "principal",
      enum: ["principal"]
    },
    permissions: {
      canViewTeachers: { type: Boolean, default: true },
      canViewStudents: { type: Boolean, default: true },
      canViewReports: { type: Boolean, default: true },
      canSchedulePTM: { type: Boolean, default: true },
      canCreate: { type: Boolean, default: false },
      canUpdate: { type: Boolean, default: false },
      canDelete: { type: Boolean, default: false }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Principal", principalSchema);