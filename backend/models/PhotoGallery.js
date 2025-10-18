import mongoose from "mongoose";

const photoGallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true, // URL or file path to the image
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PhotoGallery", photoGallerySchema);
