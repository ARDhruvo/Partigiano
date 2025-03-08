// reset.js (Middleware)
import Verify from "../Model/verify.js";

export const validateOtpForPasswordReset = async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    // Find the OTP entry for the given email
    const verifyUser = await Verify.findOne({ email });

    if (!verifyUser) {
      return res.status(400).json({ message: "OTP not found for this email" });
    }

    // Check if the provided OTP matches the stored OTP
    if (verifyUser.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // If OTP is valid, proceed to the next middleware/controller
    next();
  } catch (error) {
    console.error("OTP Validation Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
