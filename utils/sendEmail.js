const sender = require("resend"); // Replace with your actual email service SDK
require("dotenv").config();

const sendEmail = async (to, subject, message) => {
  try {
    await sender.send({
      from: process.env.EMAIL_FROM, // Your sender email (set in .env)
      to,
      subject,
      html: message, // Email content in HTML format
    });
    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error;
  }
};

module.exports = sendEmail;
