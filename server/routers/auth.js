import express from "express";
import { upload } from "../app";
import { register } from "../controllers/auth.js";

let Router = express.Router();

Router.post("/auth/register", upload.single("picture"), register);
