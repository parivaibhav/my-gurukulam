import express from "express";
import multer from "multer";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

const router = express.Router();

// Multer config for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Routes
router.get("/", getAllBlogs);
router.post(
  "/",
  protect,
  authorizeRoles("admin", "teacher"),
  upload.single("image"),
  createBlog
);
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "teacher"),
  upload.single("image"),
  updateBlog
);
router.delete("/:id", protect, authorizeRoles("admin"), deleteBlog);

export default router;
