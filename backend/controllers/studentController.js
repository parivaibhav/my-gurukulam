import User from "../models/User.js";
import Class from "../models/Class.js";

// 📌 Helper: Generate random 6-digit GR number
const generateGRNumber = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// 📌 Helper: Generate 2-digit roll number based on first letter + class grouping
const generateRollNumber = async (className, firstLetter) => {
  // Find students in same class whose name starts with same letter
  const students = await User.find({
    role: "student",
    class: className,
    name: { $regex: `^${firstLetter}`, $options: "i" },
  });

  // Next roll number = count + 1, formatted as 2 digits
  const nextRoll = (students.length + 1).toString().padStart(2, "0");
  return nextRoll;
};

// 📌 Add new student
export const addStudent = async (req, res) => {
  try {
    const { name, email, mobileNumber, location, age, fatherName, classId } =
      req.body;

    // Validation
    if (!name || !email || !mobileNumber || !classId)
      return res.status(400).json({ message: "Missing required fields" });

    // Check if class exists
    const classData = await Class.findById(classId);
    if (!classData) return res.status(404).json({ message: "Class not found" });

    // Check duplicate email
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    // Generate GR & Roll number
    const grNumber = generateGRNumber();
    const firstLetter = name.charAt(0).toUpperCase();
    const rollNumber = await generateRollNumber(
      classData.className,
      firstLetter
    );

    // Handle profile image upload (if exists)
    const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

    // Create new student (no password field)
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
      profileImage,
      grNumber,
      rollNumber,
    });

    res.status(201).json({
      message: "Student added successfully",
      student,
    });
  } catch (error) {
    console.error("Add Student Error:", error);
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
    const updateData = { ...req.body };

    if (req.file) updateData.profileImage = `/uploads/${req.file.filename}`;

    const student = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json({ message: "Student updated successfully", student });
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
