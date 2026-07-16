const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const fileRoutes = require("./routes/fileRoutes");

const app = express();

// ===============================
// Connect MongoDB
// ===============================
connectDB();

// ===============================
// Middleware
// ===============================
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ===============================
// Home Route
// ===============================
app.get("/", (req, res) => {
    res.send("🚀 CloudVault AI Backend is Running Successfully!");
});

// ===============================
// API Routes
// ===============================
app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

// File APIs
app.use("/api/files", fileRoutes);

// ===============================
// 404 Route
// ===============================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// ===============================
// Start Server
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server Running on Port ${PORT}`);
});