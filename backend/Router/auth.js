import express from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
  verifyOTP,
} from "../Controller/userController.js";
import { validateSignup, validateLogin } from "../Middleware/userMiddleware.js";
import { validateOTP } from "../Middleware/otpMiddleware.js";
import checkToken from "../Middleware/checkToken.js";

const userRouter = express.Router();

userRouter.post("/signup", validateSignup, signupUser);
userRouter.post("/login", validateLogin, loginUser);
userRouter.post("/logout", checkToken, logoutUser);
userRouter.post("/verifyotp", validateOTP, verifyOTP);

export default userRouter;
