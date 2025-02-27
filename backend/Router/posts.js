import express from "express";
//import checkToken from "../middlewares/checkToken.js";
import {
  createPost,
  deletePost,
  getAllPost,
  getPost,
  getPostByCat,
  getUserPosts,
} from "../Controller/postController.js";

const postRouter = express.Router();

postRouter.get("/", getAllPost);

postRouter.get("/:category", getPostByCat);

postRouter.get("/category/:id", getPost);

postRouter.post("/", createPost);

//router.put("/:id", checkToken, updatedUser);

postRouter.delete("/:id", deletePost);

postRouter.get("/profile/:username", getUserPosts);


//router.delete("/", checkToken, deleteAllUsers);

export default postRouter;
