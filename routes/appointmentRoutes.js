const express = require("express");
const sendEmail = require("../utils/sendEmail");
const addAppointmentToSheet = require("../utils/googleSheets");

const router = express.Router();

router.post("/book", async (req, res) => {
  const { service, date, time, user } = req.body;

  try {
    // Store in Google Sheets
    await addAppointmentToSheet(service, date, time, user);

    // Send Emails using Resend
    await sendEmail(
      user.email,
      "Appointment Confirmation",
      `Hi ${user.name}, your appointment for ${service} on ${date} at ${time} is confirmed.`
    );

    await sendEmail(
      "spa-owner@example.com",
      "New Booking Alert",
      `A new appointment was booked.<br><br>Service: ${service}<br>Date: ${date}<br>Time: ${time}<br>Customer: ${user.name} (${user.email})`
    );

    res.json({
      message: "Booking confirmed, email sent & saved in Google Sheets!",
    });
  } catch (error) {
    res.status(500).json({ error: "Booking failed" });
  }
});

module.exports = router;
