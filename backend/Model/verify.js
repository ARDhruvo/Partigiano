import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    otp: {
      type: String,
      required: [true, "OTP is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Verify = mongoose.model("Auth", authSchema);

export default Verify;
