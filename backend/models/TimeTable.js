import mongoose from "mongoose";

const timeTableSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true, // e.g., "BCA 1st Year"
      trim: true,
    },
    course: {
      type: String,
      required: true, // e.g., "BCA", "BBA", "B.Sc"
      trim: true,
    },
    semester: {
      type: String,
      required: true, // e.g., "Semester 1", "Semester 2"
      trim: true,
    },
    section: {
      type: String,
      default: "A",
    },

    // Each day contains an array of subjects/lectures
    schedule: [
      {
        day: {
          type: String,
          required: true,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
        lectures: [
          {
            subject: {
              type: String,
              required: true,
              trim: true,
            },
            teacher: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User", // reference teacher from User collection
              required: true,
            },
            startTime: {
              type: String,
              required: true, // e.g., "09:00 AM"
            },
            endTime: {
              type: String,
              required: true, // e.g., "09:50 AM"
            },
            roomNumber: {
              type: String,
              trim: true,
            },
          },
        ],
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // usually the clerk who created it
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("TimeTable", timeTableSchema);
