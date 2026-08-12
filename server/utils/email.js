const nodemailer = require("nodemailer");

/**
 * Centralized Nodemailer transporter.
 * Uses Gmail service if no SMTP_HOST is provided, otherwise uses custom SMTP host.
 */
const createTransporter = () => {
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: parseInt(process.env.SMTP_PORT || "587") === 465,
      auth: {
        user: process.env.EMAILSENDER,
        pass: process.env.EMAILPASSWORD,
      },
    });
  }

  // Default: Gmail
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAILSENDER,
      pass: process.env.EMAILPASSWORD,
    },
  });
};

const transporter = createTransporter();

/**
 * Send an OTP email to the admin for password reset.
 * @param {string} toEmail - Recipient email
 * @param {string} otp - 6-digit OTP
 */
const sendOtpEmail = async (toEmail, otp) => {
  const mailOptions = {
    from: `"Nidhivan Developer - Security" <${process.env.EMAILSENDER}>`,
    to: toEmail,
    subject: "Password Reset OTP - Nidhivan Developer Admin",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #118A43; margin: 0;">Password Reset OTP</h2>
        </div>
        <p style="color: #555; font-size: 15px;">You requested a password reset for your Nidhivan Developer admin account.</p>
        <p style="color: #555; font-size: 15px;">Your OTP code is:</p>
        <div style="background: #f4f9f6; border: 2px solid #118A43; border-radius: 8px; padding: 18px; text-align: center; margin: 20px 0;">
          <span style="font-size: 36px; font-weight: bold; letter-spacing: 10px; color: #0d6b38;">${otp}</span>
        </div>
        <p style="color: #888; font-size: 13px;">This OTP is valid for <strong>5 minutes</strong>. Do not share it with anyone.</p>
        <p style="color: #888; font-size: 13px;">If you did not request a password reset, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
        <p style="color: #aaa; font-size: 12px; text-align: center;">Nidhivan Developer, Jabalpur &mdash; Admin Panel</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

/**
 * Send an email notification to the owner when a new website lead is submitted.
 * @param {object} lead - The lead form data
 */
const sendLeadNotificationEmail = async (lead) => {
  const ownerEmail = process.env.OWNER_EMAIL;
  if (!ownerEmail) {
    console.warn("[Email] OWNER_EMAIL is not set. Skipping lead notification.");
    return;
  }

  const { name, email, mobile_no, subject, message } = lead;

  const mailOptions = {
    from: `"Nidhivan Developer - Website Lead" <${process.env.EMAILSENDER}>`,
    to: ownerEmail,
    subject: "🏠 New Website Lead Received - Nidhivan Developer",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="background: linear-gradient(135deg, #0d6b38, #118A43); padding: 20px 24px; border-radius: 8px 8px 0 0; margin: -24px -24px 24px -24px;">
          <h2 style="color: #fff; margin: 0; font-size: 20px;">🏠 New Lead Received</h2>
          <p style="color: #d4f0e2; margin: 6px 0 0 0; font-size: 13px;">Someone filled the contact form on Nidhivan Developer website</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 13px; width: 120px;">Name</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #333; font-size: 14px; font-weight: 600;">${name || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 13px;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #333; font-size: 14px;"><a href="mailto:${email}" style="color: #118A43;">${email || "N/A"}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 13px;">Mobile</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #333; font-size: 14px;">${mobile_no || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 13px;">Project</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #333; font-size: 14px; font-weight: bold; color: #C49242;">${lead.project_name || "General Inquiry"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #888; font-size: 13px;">Subject</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #333; font-size: 14px;">${subject || "N/A"}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #888; font-size: 13px; vertical-align: top;">Message</td>
            <td style="padding: 10px 0; color: #333; font-size: 14px; white-space: pre-wrap;">${message || "N/A"}</td>
          </tr>
        </table>

        <div style="background: #f4f9f6; border-radius: 6px; padding: 14px 18px; margin-top: 20px;">
          <p style="margin: 0; color: #118A43; font-size: 13px;">⏰ Received at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
        </div>

        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
        <p style="color: #aaa; font-size: 12px; text-align: center;">Nidhivan Developer, Jabalpur &mdash; Admin Notification System</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendOtpEmail, sendLeadNotificationEmail };
