import Placement from "../models/Placement.js";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import fs from "fs";

// ========================
// 📸 Multer Configuration
// ========================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/placements";
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

// ========================
// 📍 Controller Functions
// ========================

// ✅ Create Placement
export const createPlacement = async (req, res) => {
  try {
    const {
      companyName,
      jobRole,
      package: pkg,
      location,
      driveDate,
      description,
    } = req.body;

    if (!companyName || !jobRole || !driveDate) {
      return res
        .status(400)
        .json({
          message: "Company name, job role, and drive date are required.",
        });
    }

    // Handle selectedStudents array from formData
    const selectedStudents = [];

    // FormData sends keys like selectedStudents[0][name]
    for (const key in req.body) {
      const match = key.match(/^selectedStudents\[(\d+)\]\[(\w+)\]$/);
      if (match) {
        const index = parseInt(match[1]);
        const field = match[2];
        selectedStudents[index] = selectedStudents[index] || {};
        selectedStudents[index][field] = req.body[key];
      }
    }

    // Match uploaded files to student images
    if (req.files && req.files.length > 0) {
      req.files.forEach((file, i) => {
        if (selectedStudents[i]) {
          selectedStudents[i].profileImage = `/${file.path.replace(
            /\\/g,
            "/"
          )}`;
        }
      });
    }

    const placement = new Placement({
      companyName,
      jobRole,
      package: pkg,
      location,
      driveDate: new Date(driveDate),
      description,
      selectedStudents,
    });

    await placement.save();
    res.status(201).json(placement);
  } catch (err) {
    console.error("❌ Placement Error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// ✅ Get all placements
export const getPlacements = async (req, res) => {
  try {
    const placements = await Placement.find().sort({ createdAt: -1 });
    res.json(placements);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// ✅ Get Single Placement by ID
export const getPlacementById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ message: "Invalid id" });

    const placement = await Placement.findById(id);
    if (!placement)
      return res.status(404).json({ message: "Placement not found" });

    return res.json(placement);
  } catch (err) {
    return res.status(500).json({ message: err.message || "Server error" });
  }
};

// ✅ Update Placement
export const updatePlacement = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ message: "Invalid id" });

    const updates = { ...req.body };

    if (updates.driveDate) {
      const d = new Date(updates.driveDate);
      if (Number.isNaN(d.getTime()))
        return res.status(400).json({ message: "Invalid driveDate" });
      updates.driveDate = d;
    }

    const placement = await Placement.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!placement)
      return res.status(404).json({ message: "Placement not found" });

    return res.json(placement);
  } catch (err) {
    return res.status(500).json({ message: err.message || "Server error" });
  }
};

// ✅ Delete Placement
export const deletePlacement = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ message: "Invalid id" });

    const placement = await Placement.findByIdAndDelete(id);
    if (!placement)
      return res.status(404).json({ message: "Placement not found" });

    return res.json({ message: "Placement deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Server error" });
  }
};

// ✅ Add Selected Student (with profile image upload)
export const addSelectedStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentName } = req.body;

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ message: "Invalid placement id" });
    if (!studentName)
      return res.status(400).json({ message: "Student name is required" });

    const placement = await Placement.findById(id);
    if (!placement)
      return res.status(404).json({ message: "Placement not found" });

    const exists = placement.selectedStudents.some(
      (s) => s.studentName.toLowerCase() === studentName.toLowerCase()
    );
    if (exists)
      return res
        .status(400)
        .json({ message: "Student already added to this placement" });

    let profileImage = "";
    if (req.file) {
      profileImage = `/uploads/placements/${req.file.filename}`;
    }

    placement.selectedStudents.push({ studentName, profileImage });
    await placement.save();
    return res.json(placement);
  } catch (err) {
    return res.status(500).json({ message: err.message || "Server error" });
  }
};

// ✅ Remove Selected Student by name
export const removeSelectedStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentName } = req.body;

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ message: "Invalid placement id" });
    if (!studentName)
      return res.status(400).json({ message: "Student name is required" });

    const placement = await Placement.findById(id);
    if (!placement)
      return res.status(404).json({ message: "Placement not found" });

    const before = placement.selectedStudents.length;
    placement.selectedStudents = placement.selectedStudents.filter(
      (s) => s.studentName.toLowerCase() !== studentName.toLowerCase()
    );

    if (placement.selectedStudents.length === before) {
      return res
        .status(404)
        .json({ message: "Student not found in this placement" });
    }

    await placement.save();
    return res.json(placement);
  } catch (err) {
    return res.status(500).json({ message: err.message || "Server error" });
  }
};
