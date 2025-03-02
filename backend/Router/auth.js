import express from "express";
import {
  signupUser,
  loginUser,
  verifyOTP,
} from "../Controller/userController.js";
import { validateSignup, validateLogin } from "../Middleware/userMiddleware.js";
import { validateOTP } from "../Middleware/otpMiddleware.js";

const userRouter = express.Router();

userRouter.post("/signup", validateSignup, signupUser);
userRouter.post("/login", validateLogin, loginUser);
userRouter.post("/verifyotp", validateOTP, verifyOTP);

export default userRouter;
