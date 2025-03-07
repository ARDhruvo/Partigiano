import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"; // Import cookie-parser
import { connectDB } from "./config/db.js";
import rootRouter from "./Router/root.js";
import postRouter from "./Router/posts.js";

dotenv.config();

const app = express();

// Enable CORS with credentials
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], // Add all your frontend URLs
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Add cookie parser middleware
app.use(cookieParser());

app.use(express.json());

const port = process.env.PORT;

app.use("/login", rootRouter);

app.use("/posts", postRouter);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
