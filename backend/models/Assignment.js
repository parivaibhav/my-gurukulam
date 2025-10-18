import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // e.g., "DBMS Unit 2 Assignment"
      trim: true,
    },
    description: {
      type: String,
      trim: true, // short details or instructions
    },
    course: {
      type: String,
      required: true, // e.g., "BCA", "BBA"
      trim: true,
    },
    className: {
      type: String,
      required: true, // e.g., "BCA 2nd Year"
      trim: true,
    },
    subject: {
      type: String,
      required: true, // e.g., "Database Management System"
      trim: true,
    },
    dueDate: {
      type: Date,
      required: true, // submission deadline
    },
    fileUrl: {
      type: String,
      trim: true, // optional PDF or document link
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // teacher who uploaded
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Assignment", assignmentSchema);
