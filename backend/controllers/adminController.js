import Blog from "../models/Blog.js";
import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    res.status(200).json({ success: true, users });
  } catch (err) {
    console.error("Get users error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.deleteOne();
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { role, email, mobileNumber, password } = req.body;
    if (!role || !email || !mobileNumber || !password) {
      return res.status(400).json({
        message: "Role, email, mobile number, and password are required",
      });
    }
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    // Rely on User model pre-save hook to hash the password
    const user = new User({
      role,
      email: email.toLowerCase().trim(),
      mobileNumber,
      password, // plain password — model will hash
    });
    await user.save();
    res.status(201).json({ success: true, message: "User created" });
  } catch (err) {
    console.error("Create user error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// -------- Clerk controllers --------
export const getAllClerks = async (req, res) => {
  try {
    const clerks = await User.find({ role: "clerk" }).select("-password");
    res.status(200).json({ success: true, clerks });
  } catch (err) {
    console.error("Get clerks error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createClerk = async (req, res) => {
  try {
    const { email, mobileNumber, password } = req.body;
    if (!email || !mobileNumber || !password) {
      return res
        .status(400)
        .json({ message: "Email, mobile number and password are required" });
    }
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json({ message: "User with this email already exists" });
    }
    const user = new User({
      role: "clerk",
      email: email.toLowerCase().trim(),
      mobileNumber,
      password, // model will hash
    });
    await user.save();
    res.status(201).json({ success: true, message: "Clerk created" });
  } catch (err) {
    console.error("Create clerk error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateClerk = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body || {};
    const user = await User.findById(id);
    if (!user || user.role !== "clerk") {
      return res.status(404).json({ message: "Clerk not found" });
    }

    if (updates.email) user.email = updates.email.toLowerCase().trim();
    if (updates.mobileNumber) user.mobileNumber = updates.mobileNumber;
    if (updates.password) user.password = updates.password; // will be hashed by pre-save

    await user.save();
    res.status(200).json({ success: true, message: "Clerk updated" });
  } catch (err) {
    console.error("Update clerk error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteClerk = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user || user.role !== "clerk") {
      return res.status(404).json({ message: "Clerk not found" });
    }
    await user.deleteOne();
    res.status(200).json({ success: true, message: "Clerk deleted" });
  } catch (err) {
    console.error("Delete clerk error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// -------- Teacher controllers --------
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" }).select("-password");
    res.status(200).json({ success: true, teachers });
  } catch (err) {
    console.error("Get teachers error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createTeacher = async (req, res) => {
  try {
    const { email, mobileNumber, password, name } = req.body;
    if (!email || !mobileNumber || !password) {
      return res
        .status(400)
        .json({ message: "Email, mobile number and password are required" });
    }
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json({ message: "User with this email already exists" });
    }
    const user = new User({
      role: "teacher",
      email: email.toLowerCase().trim(),
      mobileNumber,
      password, // model will hash
    });
    await user.save();
    res.status(201).json({ success: true, message: "Teacher created" });
  } catch (err) {
    console.error("Create teacher error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body || {};
    const user = await User.findById(id);
    if (!user || user.role !== "teacher") {
      return res.status(404).json({ message: "Teacher not found" });
    }

    if (updates.email) user.email = updates.email.toLowerCase().trim();
    if (updates.mobileNumber) user.mobileNumber = updates.mobileNumber;
    if (updates.password) user.password = updates.password; // will be hashed by pre-save
    if (updates.name) user.name = updates.name;

    await user.save();
    res.status(200).json({ success: true, message: "Teacher updated" });
  } catch (err) {
    console.error("Update teacher error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user || user.role !== "teacher") {
      return res.status(404).json({ message: "Teacher not found" });
    }
    await user.deleteOne();
    res.status(200).json({ success: true, message: "Teacher deleted" });
  } catch (err) {
    console.error("Delete teacher error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



