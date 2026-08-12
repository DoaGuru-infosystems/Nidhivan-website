const { db } = require("../db");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");
const { sendOtpEmail } = require("../utils/email");

const handleAuth = async (data, password, res) => {
  const isMatch = await bcrypt.compare(password, data.password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const token = JWT.sign({ id: data.user_id }, process.env.JWT_SECRET, {
    expiresIn: "15h",
  });

  const user = {
    id: data.user_id,
    name: data.user_name,
    email: data.email,
    created_at: data.created_date,
  };

  return res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    user,
  });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const normalizedEmail = email.toLowerCase();

    // ✅ Check user exists
    const rows = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM registered_data WHERE email = ?",
        [normalizedEmail],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        },
      );
    });

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    return handleAuth(rows[0], password, res);
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const forgotOtpStore = new Map();
const otpRateLimitStore = new Map();

const generateOtp = () => {
  const n = crypto.randomInt(0, 1000000);
  return n.toString().padStart(6, "0");
};

// ✅ Check in registered_data table only
const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM registered_data WHERE email = ? LIMIT 1",
      [email],
      (err, result) => {
        if (err) return reject(err);
        if (result.length > 0) return resolve(result[0]);
        resolve(null);
      },
    );
  });
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // ✅ Validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const emailLower = email.trim().toLowerCase();
    const now = Date.now();

    // ✅ Rate limiting: max 3 OTPs per 15 minutes
    const rate = otpRateLimitStore.get(emailLower) || {
      lastSentAt: 0,
      sentCount: 0,
    };

    if (now - rate.lastSentAt > 15 * 60 * 1000) {
      rate.sentCount = 0;
    }

    if (rate.sentCount >= 3) {
      return res.status(429).json({
        success: false,
        message: "Too many requests. Please try again after 15 minutes.",
      });
    }

    // ✅ User check
    const user = await findUserByEmail(emailLower);
    if (!user) {
      // Return 404 to explicitly tell the admin the email is not registered
      return res.status(404).json({
        success: false,
        message: "This email is not registered as an Admin.",
      });
    }

    // ✅ OTP generate & store
    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);

    forgotOtpStore.set(emailLower, {
      otpHash,
      expiresAt: now + 5 * 60 * 1000, // 5 minutes
      attempts: 0,
    });

    rate.sentCount += 1;
    rate.lastSentAt = now;
    otpRateLimitStore.set(emailLower, rate);

    // ✅ Send OTP email via centralized utility
    try {
      await sendOtpEmail(user.email, otp);
    } catch (emailError) {
      console.error("Forgot Password - OTP email send failed:", emailError);
      // Clean up OTP store since email failed
      forgotOtpStore.delete(emailLower);
      return res.status(500).json({
        success: false,
        message:
          "Failed to send OTP email. Please check your email configuration or try again later.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "If the account exists, an OTP has been sent to the registered email.",
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const verifyOtpAndResetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // ✅ Validation
    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const emailLower = email.trim().toLowerCase();
    const otpData = forgotOtpStore.get(emailLower);

    // ✅ OTP expiry check
    if (!otpData || Date.now() > otpData.expiresAt) {
      forgotOtpStore.delete(emailLower);
      return res.status(400).json({
        success: false,
        message: "OTP has expired or is invalid. Please request a new one.",
      });
    }

    // ✅ Max attempts check (prevent brute force)
    otpData.attempts += 1;
    if (otpData.attempts > 5) {
      forgotOtpStore.delete(emailLower);
      return res.status(429).json({
        success: false,
        message: "Too many incorrect attempts. Please request a new OTP.",
      });
    }

    // ✅ OTP verify
    const isValidOtp = await bcrypt.compare(String(otp), otpData.otpHash);
    if (!isValidOtp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please check the code and try again.",
      });
    }

    // ✅ Hash and update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await new Promise((resolve, reject) => {
      db.query(
        "UPDATE registered_data SET password = ? WHERE email = ?",
        [hashedPassword, emailLower],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        },
      );
    });

    forgotOtpStore.delete(emailLower);

    return res.status(200).json({
      success: true,
      message: "Password reset successful! You can now log in with your new password.",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { login, forgotPassword, verifyOtpAndResetPassword };
