import express from "express";
import { login } from "../controllers/auth.js";

let router = express.Router();

router.post("/login", login);

export default router;
