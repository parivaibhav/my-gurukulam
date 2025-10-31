import Circular from "../models/Circular.js";
import fs from "fs";

// 📌 Create new circular
export const createCircular = async (req, res) => {
  try {
    const { title, description } = req.body;
    let fileData = null;

    if (req.file) {
      fileData = {
        url: `/uploads/${req.file.filename}`,
        filename: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
      };
    }

    const existing = await Circular.findOne({ title });
    if (existing)
      return res
        .status(400)
        .json({ message: "Circular with this title already exists" });

    const circular = await Circular.create({
      title,
      description,
      fileUrl: fileData,
    });

    res
      .status(201)
      .json({ message: "Circular created successfully", circular });
  } catch (error) {
    console.error("❌ Error creating circular:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 📌 Get all circulars
export const getCirculars = async (req, res) => {
  try {
    const circulars = await Circular.find().sort({ createdAt: -1 });
    res.status(200).json(circulars);
  } catch (error) {
    console.error("❌ Error fetching circulars:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 📌 Get single circular by ID
export const getCircularById = async (req, res) => {
  try {
    const circular = await Circular.findById(req.params.id);
    if (!circular)
      return res.status(404).json({ message: "Circular not found" });

    res.status(200).json(circular);
  } catch (error) {
    console.error("❌ Error fetching circular:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 📌 Update circular
export const updateCircular = async (req, res) => {
  try {
    const { title, description } = req.body;

    const circular = await Circular.findById(req.params.id);
    if (!circular)
      return res.status(404).json({ message: "Circular not found" });

    // Delete old file if new one uploaded
    if (req.file && circular.fileUrl?.url) {
      const oldFilePath = `.${circular.fileUrl.url}`;
      if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
    }

    const updatedCircular = await Circular.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        fileUrl: req.file
          ? {
              url: `/uploads/${req.file.filename}`,
              filename: req.file.originalname,
              mimeType: req.file.mimetype,
              size: req.file.size,
            }
          : circular.fileUrl,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Circular updated successfully", updatedCircular });
  } catch (error) {
    console.error("❌ Error updating circular:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 📌 Delete circular
export const deleteCircular = async (req, res) => {
  try {
    const circular = await Circular.findById(req.params.id);
    if (!circular)
      return res.status(404).json({ message: "Circular not found" });

    if (circular.fileUrl?.url) {
      const filePath = `.${circular.fileUrl.url}`;
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await Circular.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Circular deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting circular:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
