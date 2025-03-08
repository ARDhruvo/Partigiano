import User from "../Model/user.js";

// Controller to get user by email
export const getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    // Find the user by email and exclude the password field
    const user = await User.findOne({ email }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
