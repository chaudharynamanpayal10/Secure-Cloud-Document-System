const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Import Routes
const fileRoutes = require("./routes/fileRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("🚀 CloudVault AI Backend is Running Successfully!");
});

// Authentication Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/file", fileRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});