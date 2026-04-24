const bcrypt = require("bcryptjs");
const Principal = require("../models/Principal");

const SYSTEM_ADMIN_EMAIL = "waheed@gmail.com";
const SYSTEM_ADMIN_PASSWORD = "Waheed123";

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
        role: principal.role || "principal"
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

const signinPrincipal = async (req, res) => {
  try {
    const { officialEmail, password } = req.body;

    if (!officialEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required."
      });
    }

    if (!isValidEmail(officialEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address."
      });
    }

    const email = officialEmail.toLowerCase().trim();

    if (email === SYSTEM_ADMIN_EMAIL && password === SYSTEM_ADMIN_PASSWORD) {
      return res.status(200).json({
        success: true,
        message: "System Admin sign in successful.",
        redirectTo: "system-admin-dashboard.html",
        data: {
          id: "system-admin-001",
          fullName: "Waheed",
          officialEmail: SYSTEM_ADMIN_EMAIL,
          role: "system-admin"
        }
      });
    }

    const principal = await Principal.findOne({
      officialEmail: email
    });

    if (!principal) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password."
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, principal.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Principal sign in successful.",
      redirectTo: "principal-dashboard.html",
      data: {
        id: principal._id,
        fullName: principal.fullName,
        schoolName: principal.schoolName,
        officialEmail: principal.officialEmail,
        contactNumber: principal.contactNumber,
        role: "principal"
      }
    });
  } catch (error) {
    console.error("signinPrincipal error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while signing in."
    });
  }
};

module.exports = {
  signupPrincipal,
  signinPrincipal
};