import express from "express";
import { loginUser, logoutUser,getMe } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser);
router.get("/me", getMe);
router.post("/logout", logoutUser);

export default router;
