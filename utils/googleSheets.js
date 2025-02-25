const { google } = require("googleapis");
require("dotenv").config();

const auth = new google.auth.GoogleAuth({
  keyFile: "google-service-account.json", // Path to your service account JSON file
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

const SPREADSHEET_ID = process.env.SPREADSHEET_ID; // Your Google Sheet ID (set in .env)

const addAppointmentToSheet = async (service, date, time, user) => {
  try {
    const values = [[service, date, time, user.name, user.email]];
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!A:E", // Adjust range if needed
      valueInputOption: "RAW",
      resource: { values },
    });
    console.log("✅ Appointment added to Google Sheets");
  } catch (error) {
    console.error("❌ Failed to add appointment:", error);
    throw error;
  }
};

module.exports = addAppointmentToSheet;
