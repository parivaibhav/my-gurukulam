import Class from "../models/Class.js";
import User from "../models/User.js";

// 📌 Create a new class
export const createClass = async (req, res) => {
  try {
    const { courseName, className, year } = req.body;

    if (!courseName || !className || !year) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newClass = await Class.create({ courseName, className, year });
    res.status(201).json(newClass);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating class", error: error.message });
  }
};

// 📌 Get all classes
export const getClasses = async (req, res) => {
  try {
    const classes = await Class.find().sort({ createdAt: -1 });
    res.json(classes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching classes", error: error.message });
  }
};

// 📌 Update a class
export const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Class.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Class not found" });
    res.json(updated);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating class", error: error.message });
  }
};

// 📌 Delete a class
export const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Class.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Class not found" });
    res.json({ message: "Class deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting class", error: error.message });
  }
};
