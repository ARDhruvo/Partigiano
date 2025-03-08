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
} from "../Controller/postController.js";

const postRouter = express.Router();

postRouter.get("/", getAllPost);

postRouter.get("/:category", getPostByCat);

postRouter.get("/category/:id", getPost);

postRouter.patch("/:id/like", updatePostLike);

postRouter.post("/", createPost);

postRouter.delete("/:id", deletePost);

router.get("/user/posts", authenticate, getUserPosts);


//router.delete("/", checkToken, deleteAllUsers);

export default postRouter;
