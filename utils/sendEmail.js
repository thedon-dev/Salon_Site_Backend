const sender = require("resend"); // Replace with your actual email service SDK
require("dotenv").config();
const resend = new sender.Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, message) => {
  //   const html = `<p>Your appointment has been booked successfully!</p>`;
  try {
    const response = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text: message,
    });
    console.log("✅ Email sent:", response);
    return response;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error;
  }
};

module.exports = sendEmail;
