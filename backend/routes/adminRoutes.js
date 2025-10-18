import express from "express";
import {
  getAllClerks,
  createClerk,
  updateClerk,
  deleteClerk,
  getAllTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
 
} from "../controllers/adminController.js";

const router = express.Router();

// -------- Clerk Routes --------
router.get("/clerks", getAllClerks);
router.post("/clerks", createClerk);
router.put("/clerks/:id", updateClerk);
router.delete("/clerks/:id", deleteClerk);

// -------- Teacher Routes --------
router.get("/teachers", getAllTeachers);
router.post("/teachers", createTeacher);
router.put("/teachers/:id", updateTeacher);
router.delete("/teachers/:id", deleteTeacher);



export default router;
