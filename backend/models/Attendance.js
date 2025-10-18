import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      default: Date.now, // attendance date
    },
    course: {
      type: String,
      required: true, // e.g., "BCA"
      trim: true,
    },
    className: {
      type: String,
      required: true, // e.g., "BCA 1st Year"
      trim: true,
    },
    subject: {
      type: String,
      required: true, // e.g., "Computer Networks"
      trim: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // teacher marking attendance
      required: true,
    },
    students: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // student user reference
          required: true,
        },
        status: {
          type: String,
          enum: ["Present", "Absent", "Leave"],
          default: "Absent",
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", attendanceSchema);
