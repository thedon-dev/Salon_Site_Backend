require("dotenv").config();
const express = require("express");
const cors = require("cors");

const appointmentRoutes = require("./routes/appointmentRoutes.js");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api", appointmentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
