import express from "express";
import multer from "multer";
import {
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

// Multer setup for image upload
const upload = multer({ dest: "uploads/" });

// Routes
router.post("/add", upload.single("profileImage"), addStudent);
router.get("/", getStudents);
router.put("/update/:id", upload.single("profileImage"), updateStudent);
router.delete("/delete/:id", deleteStudent);

export default router;
