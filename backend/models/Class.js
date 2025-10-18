import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true, // e.g., "Computer Science", "Business Administration"
      trim: true,
    },
    className: {
      type: String,
      required: true, // e.g., "BCA", "BBA"
      trim: true,
    },
    year: {
      type: String,
      required: true, // e.g., "1st Year", "2nd Year"
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Class", classSchema);
