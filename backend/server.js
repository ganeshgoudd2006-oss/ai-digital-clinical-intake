const path = require("path");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Load backend/.env explicitly so it is always found, even when the server is
// started from the repository root (for example `node backend/server.js`).
require("dotenv").config({ path: path.join(__dirname, ".env") });

const Patient = require("./models/Patient");

const app = express();
const PORT = process.env.PORT || 5000;

// Give up after 10 seconds instead of the MongoDB default of 30 seconds, so a
// connection problem is reported quickly instead of looking like a hang.
const MONGO_CONNECT_OPTIONS = {
  serverSelectionTimeoutMS: 10000,
};

// Middleware
app.use(cors());
app.use(express.json());

// Test API
app.get("/", (req, res) => {
  res.json({
    message: "AI Clinical Intake Backend is running",
  });
});

// Create and save patient intake
app.post("/api/patients", async (req, res) => {
  try {
    const patient = new Patient(req.body);

    const savedPatient = await patient.save();

    console.log("Patient saved:", savedPatient._id);

    res.status(201).json({
      message: "Patient intake saved successfully",
      data: savedPatient,
    });
  } catch (error) {
    // Missing or invalid fields are reported by Mongoose validation.
    if (error.name === "ValidationError") {
      console.error("Invalid patient intake:", error.message);

      return res.status(400).json({
        message: "Invalid patient intake data",
        error: error.message,
      });
    }

    console.error("Error saving patient:", error.message);

    res.status(500).json({
      message: "Failed to save patient intake",
      error: error.message,
    });
  }
});

// Unknown routes are answered as JSON instead of the default HTML page.
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Final safety net: anything unexpected is returned as JSON too.
app.use((error, req, res, next) => {
  console.error("Unexpected server error:", error.message);

  res.status(error.status || 500).json({
    message: "Unexpected server error",
    error: error.message,
  });
});

// Connect to MongoDB Atlas first, then start the Express server.
const startServer = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from backend/.env");
    }

    await mongoose.connect(process.env.MONGODB_URI, MONGO_CONNECT_OPTIONS);

    console.log("MongoDB Atlas connected successfully");
    console.log("Database:", mongoose.connection.name);

    // The Express server only starts listening once the connection succeeded.
    const server = app.listen(PORT, () => {
      console.log(`Backend server running on http://localhost:${PORT}`);
    });

    // Close the HTTP server and the database connection on Ctrl+C / shutdown.
    const shutdown = (signal) => {
      console.log(`${signal} received, shutting down`);

      server.close(async () => {
        await mongoose.connection.close();
        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));

    return server;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.error(
      "Check that this machine's IP address is in your MongoDB Atlas IP Access " +
        "List and that the MONGODB_URI credentials in backend/.env are correct."
    );

    // Fail loudly, so a backend that did not start is not mistaken for a healthy one.
    process.exit(1);
  }
};

startServer();