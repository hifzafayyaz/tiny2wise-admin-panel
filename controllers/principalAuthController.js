const bcrypt = require("bcryptjs");
const Principal = require("../models/Principal");

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const signupPrincipal = async (req, res) => {
  try {
    const { fullName, schoolName, officialEmail, contactNumber, password } = req.body;

    if (!fullName || !schoolName || !officialEmail || !contactNumber || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required."
      });
    }

    if (!isValidEmail(officialEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address."
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long."
      });
    }

    const existingPrincipal = await Principal.findOne({
      officialEmail: officialEmail.toLowerCase()
    });

    if (existingPrincipal) {
      return res.status(409).json({
        success: false,
        message: "A principal account with this email already exists."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const principal = await Principal.create({
      fullName,
      schoolName,
      officialEmail: officialEmail.toLowerCase(),
      contactNumber,
      password: hashedPassword
    });

    return res.status(201).json({
      success: true,
      message: "Principal account created successfully.",
      data: {
        id: principal._id,
        fullName: principal.fullName,
        schoolName: principal.schoolName,
        officialEmail: principal.officialEmail,
        contactNumber: principal.contactNumber,
        role: principal.role,
        permissions: principal.permissions
      }
    });
  } catch (error) {
    console.error("signupPrincipal error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating principal account."
    });
  }
};

module.exports = {
  signupPrincipal
};