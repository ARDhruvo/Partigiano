import express from "express";
import { getUserByEmail } from "../Controller/infoController.js";

const infoRouter = express.Router();

// Route to get user by email
infoRouter.get("/:email", getUserByEmail);

export default infoRouter;
