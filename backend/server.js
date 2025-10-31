import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import blogRoutes from "./routes/BlogRoutes.js";
import connectDB from "./config/db.js";
import classRoutes from "./routes/classRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import cookeParser from "cookie-parser";
import placementRoutes from "./routes/PlacementRoutes.js";
import CircularRoutes from "./routes/CircularRoutes.js";
import galleryRoutes from "./routes/GalleryRoutes.js";

dotenv.config();

const app = express();

// CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookeParser());

// Serve uploads folder
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/blogs", blogRoutes);

app.use("/api/clerk/classes", classRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/placements", placementRoutes);
app.use("/api/circulars", CircularRoutes);
app.use("/api/gallery", galleryRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("College Management API is running");
});

// Connect to DB and start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
