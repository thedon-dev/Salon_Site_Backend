const { google } = require("googleapis");
require("dotenv").config();
const path = require("path");

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "service-account.json"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

const addAppointmentToSheet = async (service, date, time, user) => {
  try {
    const sheetName = "Sheet1";

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A1:A1`,
    });

    if (!response.data.values) {
      const headers = [
        ["Service", "Date", "Time", "Customer Name", "Customer Email"],
      ];
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!A1:E1`,
        valueInputOption: "RAW",
        resource: { values: headers },
      });
    }

    const serviceName =
      typeof service === "object"
        ? `${service.name} - ${service.price}`
        : service;

    const userName = user?.name || "Unknown";
    const userEmail = user?.email || "Unknown";

    const values = [[serviceName, date, time, userName, userEmail]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!A:E",
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
