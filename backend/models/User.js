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

    // Common fields
    email: {
      type: String,
      required: function () {
        return ["student", "teacher", "clerk", "admin"].includes(this.role);
      },
      unique: true,
      lowercase: true,
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: function () {
        return ["student", "teacher", "clerk", "admin"].includes(this.role);
      },
      match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"],
    },
    password: {
      type: String,
      required: function () {
        return ["teacher", "clerk", "admin"].includes(this.role);
      },
      minlength: 6,
    },

    // Student-specific fields
    name: {
      type: String,
      required: function () {
        return this.role === "student";
      },
      trim: true,
    },
    location: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },
    age: {
      type: Number,
      required: function () {
        return this.role === "student";
      },
    },
    class: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },
    course: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },
    fatherName: {
      type: String,
      required: function () {
        return this.role === "student";
      },
    },
  },
  { timestamps: true }
);

//
//  Pre-save hook — Hash password before saving
//
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // only hash if changed
  // If password already looks like a bcrypt hash, skip hashing to avoid double-hash
  if (typeof this.password === "string" && this.password.startsWith("$2")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//
//  Method to compare passwords during login
//
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//
// Method to generate JWT token
//
userSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET || "defaultsecret", // fallback for development
    { expiresIn: "7d" }
  );
};

export default mongoose.model("User", userSchema);
