import mongoose from "mongoose";

const placementSchema = new mongoose.Schema(
  {
    // 🏢 Company Information
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },

    // 💼 Job Role
    jobRole: {
      type: String,
      required: [true, "Job role is required"],
      trim: true,
    },

    // 💰 Package Offered
    package: {
      type: String,
      trim: true,
      default: "",
    },

    // 📍 Location of Placement
    location: {
      type: String,
      trim: true,
      default: "",
    },

    // 📅 Drive Date
    driveDate: {
      type: Date,
      required: [true, "Drive date is required"],
    },

    // 📝 Description
    description: {
      type: String,
      trim: true,
      default: "",
    },

    // 🎓 Selected Students
    selectedStudents: [
      {
        // ✅ Use 'name' (matches frontend)
        name: {
          type: String,
          required: [true, "Student name is required"],
          trim: true,
        },
        profileImage: {
          type: String,
          trim: true,
          default: "",
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Placement", placementSchema);
