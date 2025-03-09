// resetRouter.js
import express from "express";
import {
  sendOtp,
  verifyOtp,
  resetPassword,
} from "../Controller/resetController.js";
import { validateOtpForPasswordReset } from "../Middleware/reset.js";

const router = express.Router();

// Route to send OTP for password reset
router.post("/send-otp", sendOtp);

// Route to verify OTP
router.post("/verify-otp", verifyOtp);

// Route to reset password
router.post("/reset-password", resetPassword);

export default router;
