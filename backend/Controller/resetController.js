// resetController.js
import User from "../Model/user.js";
import Verify from "../Model/verify.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SENDER,
    pass: process.env.PASSWORD,
  },
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP for password reset
export const sendOtp = async (req, res) => {
  const { email } = req.body;

  console.log("OTP is trying to be sent");

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP
    const otp = generateOTP();

    // Update or create OTP entry in the Verify collection
    await Verify.findOneAndUpdate(
      { email },
      { otp },
      { upsert: true, new: true }
    );

    // Send OTP email
    await transporter.sendMail({
      from: process.env.SENDER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is: ${otp}`,
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  console.log(email, otp);

  try {
    // Verify OTP
    const verifyUser = await Verify.findOne({ email, otp });
    if (!verifyUser) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // If OTP is valid, allow the user to reset the password
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  console.log("resetting");

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password (optional, since Mongoose pre-save middleware will hash it)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the password directly
    user.password = hashedPassword;

    // Save the user (Mongoose's pre-save middleware will also hash the password)
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
