import express from "express";
import { signupUser, loginUser } from "../Controller/userController.js";
import { validateSignup, validateLogin } from "../Middleware/userMiddleware.js";

const userRouter = express.Router();

userRouter.post("/signup", validateSignup, signupUser);
userRouter.post("/login", validateLogin, loginUser);

export default userRouter;
