import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const existing = await User.findOne({ email: "vaibhavpari@gmail.com" });
if (existing) await existing.deleteOne(); // remove old one

const admin = new User({
  role: "admin",
  email: "vaibhavpari@gmail.com",
  mobileNumber: "9999999999",
  password: "Admin@123", // plain password
});

await admin.save();
console.log("Admin created with password Admin@123");
process.exit();
