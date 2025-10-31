import User from "../models/User.js";
import jwt from "jsonwebtoken";
import fetch from "node-fetch"; // for verifying reCAPTCHA with Google

// ✅ GET user info from token
export const getMe = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ role: user.role, email: user.email });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ LOGIN with reCAPTCHA verification
export const loginUser = async (req, res) => {
  try {
    const { email, password, captcha } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    if (!captcha)
      return res.status(400).json({ message: "Please complete the reCAPTCHA" });

    // 🔒 Verify reCAPTCHA with Google
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`;
    const captchaResponse = await fetch(verifyUrl, { method: "POST" });
    const captchaData = await captchaResponse.json();

    if (!captchaData.success) {
      return res.status(400).json({ message: "reCAPTCHA verification failed" });
    }

    // 🔐 Find user and check password
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // ✅ Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "7d" }
    );

    // ✅ Send HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // ✅ Respond with success
    res.status(200).json({
      success: true,
      message: "Login successful",
      role: user.role,
      email: user.email,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ LOGOUT
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
