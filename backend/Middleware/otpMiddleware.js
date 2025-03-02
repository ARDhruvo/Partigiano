import Verify from "../Model/verify.js";

export const validateOTP = async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    const verifyUser = await Verify.findOne({ email, otp });
    if (!verifyUser) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    next();
  } catch (error) {
    console.error("OTP Validation Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
