import express from "express";
import {
  getAllPhotos,
  uploadPhoto,
  deletePhoto,
  upload,
} from "../controllers/GalleryController.js";

const router = express.Router();

// ✅ GET all photos
router.get("/", getAllPhotos);

// ✅ POST upload photo (with multer middleware)
router.post("/", upload.single("image"), uploadPhoto);

// ✅ DELETE photo by ID
router.delete("/:id", deletePhoto);

export default router;
