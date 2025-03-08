import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"; // Import cookie-parser
import { connectDB } from "./config/db.js";
import rootRouter from "./Router/root.js";
import postRouter from "./Router/posts.js";
import infoRouter from "./Router/info.js"; // Import the new user routes

dotenv.config();

const app = express();

// Enable CORS with credentials
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true,
  })
);

// Add cookie parser middleware
app.use(cookieParser());

app.use(express.json());

const port = process.env.PORT;

// Use the routers
app.use("/login", rootRouter); // Existing routes
app.use("/posts", postRouter); // Existing routes
app.use("/info", infoRouter); // New user routes

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
