import mongoose from "mongoose";

const syllabusSchema = new mongoose.Schema(
  {
    course: {
      type: String,
      required: true, // e.g., "BCA", "BBA", "B.Sc"
      trim: true,
    },
    className: {
      type: String,
      required: true, // e.g., "BCA 1st Year"
      trim: true,
    },
    semester: {
      type: String,
      required: true, // e.g., "Semester 1"
      trim: true,
    },
    subject: {
      type: String,
      required: true, // e.g., "Computer Fundamentals"
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },

    // If clerk uploads a file (PDF)
    fileUrl: {
      type: String,
      trim: true, // store cloud URL (e.g., from Cloudinary or local storage)
    },

    // Optional list of topics if not using file
    topics: [
      {
        unitNumber: Number,
        title: String,
        details: String,
      },
    ],

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to Clerk or Admin
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Syllabus", syllabusSchema);
