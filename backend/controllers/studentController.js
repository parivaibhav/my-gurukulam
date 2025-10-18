import User from "../models/User.js";
import Class from "../models/Class.js";

// 📌 Add new student
export const addStudent = async (req, res) => {
  try {
    const { name, email, mobileNumber, location, age, fatherName, classId } =
      req.body;

    if (!name || !email || !mobileNumber || !classId)
      return res.status(400).json({ message: "Missing required fields" });

    const classData = await Class.findById(classId);
    if (!classData) return res.status(404).json({ message: "Class not found" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const student = await User.create({
      role: "student",
      name,
      email,
      mobileNumber,
      location,
      age,
      fatherName,
      class: classData.className,
      course: classData.courseName,
      password: "student123", // default password (optional)
    });

    res.status(201).json(student);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding student", error: error.message });
  }
};

// 📌 Get students (with optional filters)
export const getStudents = async (req, res) => {
  try {
    const { classId, course } = req.query;

    let filter = { role: "student" };
    if (classId) {
      const classData = await Class.findById(classId);
      if (classData) {
        filter.class = classData.className;
        filter.course = classData.courseName;
      }
    }
    if (course) filter.course = course;

    const students = await User.find(filter).sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching students", error: error.message });
  }
};

// 📌 Update student
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating student", error: error.message });
  }
};

// 📌 Delete student
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await User.findByIdAndDelete(id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting student", error: error.message });
  }
};
