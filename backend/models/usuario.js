import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["user", "admin", "seller"],
      default: "user"
    },
    address: {
      country: String,
      city: String,
      details: String
    },
    phone: String
  },
  {
    timestamps: true
  }
);

export default mongoose.model("User", userSchema);