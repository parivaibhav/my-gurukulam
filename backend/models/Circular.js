import mongoose from "mongoose";

const circularSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 150,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    fileUrl: {
      url: { type: String, trim: true },
      filename: { type: String, trim: true },
      mimeType: { type: String, trim: true },
      size: { type: Number },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Circular", circularSchema);
