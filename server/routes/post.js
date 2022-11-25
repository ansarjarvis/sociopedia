import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/post.js";
import { varifyToken } from "../middlewares/auth.js";
let router = express.Router();

/* Read  */
router.get("/", varifyToken, getFeedPosts);
router.get("/:userId/posts", varifyToken, getUserPosts);

/* Update */
router.patch("/:id/like", varifyToken, likePost);

export default router;
