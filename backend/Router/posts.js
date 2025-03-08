import express from "express";
//import checkToken from "../middlewares/checkToken.js";
import {
  createPost,
  deletePost,
  getAllPost,
  getPost,
  getPostByCat,
  getUserPosts,
  updatePostLike,
  updatePostReport,
  resetPostReport,
  createComment,
} from "../Controller/postController.js";

const postRouter = express.Router();

postRouter.get("/", getAllPost);

postRouter.get("/:category", getPostByCat);

postRouter.get("/category/:id", getPost);

postRouter.patch("/:id/like", updatePostLike);

postRouter.patch("/:id/report", updatePostReport);

postRouter.patch("/:id/reset-reports", resetPostReport);

postRouter.post("/", createPost);

postRouter.post("/:id/comment", createComment);

postRouter.delete("/:id", deletePost);

postRouter.get("/user/posts", getUserPosts);

//router.delete("/", checkToken, deleteAllUsers);

export default postRouter;
