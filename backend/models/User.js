import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["student", "teacher", "clerk", "admin"],
      required: true,
    },

    // ✅ Common fields for all users
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    mobileNumber: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"],
    },

    password: {
      type: String,
      required: function () {
        return ["teacher", "clerk", "admin"].includes(this.role);
      },
      minlength: 6,
    },

    profileImage: {
      type: String,
      default: "", // can later store uploaded file URL
    },

    // 🎓 Student-only fields
    grNumber: {
      type: String, // Random 6-digit number
      unique: true,
      sparse: true,
      trim: true,
    },

    rollNumber: {
      type: String, // 2-digit roll no (per class)
      trim: true,
    },

    class: {
      type: String,
    },

    course: {
      type: String,
    },

    location: {
      type: String,
    },

    age: {
      type: Number,
    },

    fatherName: {
      type: String,
    },
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next) {
  const User = mongoose.model("User", userSchema);

  // Hash password if not already hashed
  if (
    this.isModified("password") &&
    this.password &&
    !this.password.startsWith("$2")
  ) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  // 🎓 Generate Random GR Number (6-digit unique)
  if (this.role === "student" && !this.grNumber) {
    let unique = false;
    let newGR;

    while (!unique) {
      newGR = Math.floor(100000 + Math.random() * 900000).toString(); // random 6-digit
      const existing = await User.findOne({ grNumber: newGR });
      if (!existing) unique = true;
    }

    this.grNumber = newGR;
  }

  //  Generate Roll Number (2-digit per class)
  if (this.role === "student" && !this.rollNumber && this.class) {
    const lastStudentInClass = await User.findOne({
      role: "student",
      class: this.class,
    })
      .sort({ rollNumber: -1 })
      .select("rollNumber");

    let nextRoll = 1;
    if (lastStudentInClass?.rollNumber)
      nextRoll = parseInt(lastStudentInClass.rollNumber) + 1;

    this.rollNumber = String(nextRoll).padStart(2, "0"); // e.g. 01, 02
  }

  next();
});

//
// Password comparison
//
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//
// JWT Token generation
//
userSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET || "defaultsecret",
    { expiresIn: "7d" }
  );
};

export default mongoose.model("User", userSchema);
