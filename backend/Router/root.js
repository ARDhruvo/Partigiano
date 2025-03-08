import express from "express";
import userRouter from "./auth.js";

const rootRouter = express.Router();

rootRouter.use("/auth", userRouter);

export default rootRouter;
