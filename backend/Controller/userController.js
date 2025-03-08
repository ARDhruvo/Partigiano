import User from "../Model/user.js";
import Verify from "../Model/verify.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Access token - short lived (1 hour)
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

// Refresh token - longer lived (7 days)
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

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

// User Signup Controller
export const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or Email already exists" });
    }

    const newUser = new User({
      username,
      email,
      password,
      accStatus: "pending",
    });

    await newUser.save();

    const otp = generateOTP();
    const verifyUser = new Verify({
      email,
      otp,
    });

    await verifyUser.save();

    // Send OTP email with the required message format
    await transporter.sendMail({
      from: process.env.SENDER,
      to: email,
      subject: "Verify your account",
      text: `Your OTP is ${otp}`,
    });

    res.status(201).json({
      message: "User registered successfully. Please verify your email.",
      user: { username, email },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// User Login Controller
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }

    if (user.accStatus === "pending") {
      const otp = generateOTP();
      await Verify.findOneAndUpdate(
        { email: user.email },
        { otp },
        { upsert: true }
      );

      // Send new OTP email
      await transporter.sendMail({
        from: process.env.SENDER,
        to: user.email,
        subject: "Verify your account",
        text: `Your OTP is: ${otp}`,
      });

      return res.status(403).json({
        message: "Account not verified",
        redirectTo: "/verify",
        email: user.email, // Send email back to client
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // res.json(accessToken);

    // Set access token in cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 60 * 60 * 1000, // 1 hour
      path: "/",
    });

    // Set refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
        accStatus: user.accStatus,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Verify OTP Controller
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const verifyUser = await Verify.findOne({ email, otp });
    if (!verifyUser) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Update user status to verified
    await User.findOneAndUpdate({ email }, { accStatus: "verified" });

    // Delete the verification entry from the database
    await Verify.findOneAndDelete({ email });

    res.status(200).json({ message: "Account verified successfully" });
  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Logout Controller
export const logoutUser = (req, res) => {
  // Clear both cookies
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/auth/refresh",
  });

  res.status(200).json({ message: "Logout successful" });
};

// Refresh Token Controller
export const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh Token is required" });
  }

  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Refresh Token" });

    const newAccessToken = generateAccessToken(user);

    // Set new access token in cookie
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 60 * 60 * 1000, // 1 hour
      path: "/",
    });

    res.status(200).json({ accessToken: newAccessToken });
  });
};

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  console.log("OTP is trying to be sent");

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = generateOTP();
    await Verify.findOneAndUpdate(
      { email },
      { otp },
      { upsert: true, new: true }
    );

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

// userController.js
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
