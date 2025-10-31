import express from "express";
import {
  createPlacement,
  getPlacements,
  getPlacementById,
  updatePlacement,
  deletePlacement,
  addSelectedStudent,
  removeSelectedStudent,
  upload,
} from "../controllers/placementController.js";

const router = express.Router();

// CRUD routes
router.post("/", upload.any(), createPlacement);
router.get("/", getPlacements);
router.get("/:id", getPlacementById);
router.put("/:id", updatePlacement);
router.delete("/:id", deletePlacement);

// Student management routes
router.post(
  "/:id/add-student",
  upload.single("profileImage"),
  addSelectedStudent
);
router.post("/:id/remove-student", removeSelectedStudent);

export default router;
