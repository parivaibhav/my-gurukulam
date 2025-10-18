import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // must be role: "student"
      required: true,
    },
    course: {
      type: String,
      required: true, // e.g., "BCA", "BBA"
      trim: true,
    },
    className: {
      type: String,
      required: true, // e.g., "BCA 1st Year"
      trim: true,
    },
    year: {
      type: String,
      required: true, // e.g., "2025-26"
      trim: true,
    },
    semester: {
      type: String,
      required: true, // e.g., "1st Semester"
      trim: true,
    },
    totalAmount: {
      type: Number,
      required: true, // total fee for that semester/year
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Partial"],
      default: "Pending",
    },
    paymentHistory: [
      {
        razorpayPaymentId: { type: String }, // payment id from Razorpay
        amount: { type: Number },
        paymentDate: { type: Date, default: Date.now },
        status: {
          type: String,
          enum: ["Created", "Successful", "Failed"],
          default: "Created",
        },
        method: {
          type: String,
          enum: ["Razorpay", "BankTransfer"],
          default: "Razorpay",
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Fee", feeSchema);
