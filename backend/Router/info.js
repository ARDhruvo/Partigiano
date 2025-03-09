import express from "express";
import {
  getUserByEmail,
  getUserByUsername,
} from "../Controller/infoController.js";

const infoRouter = express.Router();

// Route to get user by email
infoRouter.get("/:email", getUserByEmail);
infoRouter.get("/user/:username", getUserByUsername);

export default infoRouter;
