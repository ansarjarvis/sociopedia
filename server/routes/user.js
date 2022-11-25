import express from "express";
import { varifyToken } from "../middlewares/auth.js";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/user.js";
let router = express.Router();

/* Read */
router.get("/:id", varifyToken, getUser);
router.get("/:id/friends", varifyToken, getUserFriends);

/* Update */
router.patch("/:id/:friendId", varifyToken, addRemoveFriend);

export default router;
