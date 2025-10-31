import PhotoGallery from "../models/PhotoGallery.js";
import fs from "fs";
import path from "path";
import multer from "multer";

const uploadDir = "uploads/gallery";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 📁 Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/gallery");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });

// ✅ GET all photos
export const getAllPhotos = async (req, res) => {
  try {
    const photos = await PhotoGallery.find().sort({ createdAt: -1 });
    res.status(200).json(
      photos.map((p) => ({
        id: p._id,
        title: p.title,
        url: `${req.protocol}://${req.get(
          "host"
        )}/uploads/gallery/${path.basename(p.image)}`,
      }))
    );
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch photos", error });
  }
};

// ✅ POST (upload) photo
export const uploadPhoto = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No image uploaded" });

    const photo = new PhotoGallery({
      title: req.body.title || "Untitled",
      image: req.file.path,
    });

    await photo.save();

    res.status(201).json({
      id: photo._id,
      title: photo.title,
      url: `${req.protocol}://${req.get(
        "host"
      )}/uploads/gallery/${path.basename(photo.image)}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload photo", error });
  }
};

// ✅ DELETE photo
export const deletePhoto = async (req, res) => {
  try {
    const photo = await PhotoGallery.findById(req.params.id);
    if (!photo) return res.status(404).json({ message: "Photo not found" });

    // delete image file
    if (fs.existsSync(photo.image)) {
      fs.unlinkSync(photo.image);
    }

    await photo.deleteOne();
    res.json({ message: "Photo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete photo", error });
  }
};
