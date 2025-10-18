import mongoose from "mongoose";

const circularSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    fileUrl: {
      type: String, // optional PDF or document link
      trim: true,
    },
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // clerk or admin
      required: true,
    },
    audience: {
      type: String,
      enum: ["Students", "Teachers", "All"],
      default: "All",
    },
    validFrom: {
      type: Date,
      default: Date.now,
    },
    validTill: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Circular", circularSchema);
