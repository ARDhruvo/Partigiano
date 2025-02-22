import express from "express";
//import checkToken from "../middlewares/checkToken.js";
import {
  createPost,
  deletePost,
  getAllPost,
  getPost,
  getPostByCat,
} from "../Controller/postController.js";

const postRouter = express.Router();

postRouter.get("/", getAllPost);

postRouter.get("/:category", getPostByCat);

postRouter.get("/category/:id", getPost);

postRouter.post("/", createPost);

//router.put("/:id", checkToken, updatedUser);

postRouter.delete("/:id", deletePost);

//router.delete("/", checkToken, deleteAllUsers);

export default postRouter;
