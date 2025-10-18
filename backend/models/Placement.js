import mongoose from "mongoose";

const placementSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true, // e.g., "TCS", "Infosys"
      trim: true,
    },
    jobRole: {
      type: String,
      required: true, // e.g., "Software Engineer"
      trim: true,
    },
    package: {
      type: String,
      trim: true, // e.g., "6 LPA"
    },
    location: {
      type: String,
      trim: true, // e.g., "Bangalore, India"
    },
    driveDate: {
      type: Date,
      required: true,
    },
    eligibilityCriteria: {
      type: String,
      trim: true, // e.g., "Minimum 7.0 CGPA, No active backlogs"
    },
    description: {
      type: String,
      trim: true,
    },
    companyLogo: {
      type: String,
      trim: true, // URL to image (Cloudinary, etc.)
    },

    // Reference to students who got placed
    selectedStudents: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Must have role: "student"
        },
        remarks: String, // e.g., "Offered internship" or "Full-time offer"
      },
    ],

    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // usually a clerk or admin
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Placement", placementSchema);
