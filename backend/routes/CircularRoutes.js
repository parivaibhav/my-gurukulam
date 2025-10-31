import express from "express";
import multer from "multer";
import path from "path";
import {
  createCircular,
  getCirculars,
  getCircularById,
  updateCircular,
  deleteCircular,
} from "../controllers/CircularController.js";

const router = express.Router();

// 📁 Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// 📌 Routes
router.post("/", upload.single("file"), createCircular);
router.get("/", getCirculars);
router.get("/:id", getCircularById);
router.put("/:id", upload.single("file"), updateCircular);
router.delete("/:id", deleteCircular);

export default router;
