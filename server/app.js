import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import multer from "multer";
import User from "./models/user.js";
import Post from "./models/post.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";
import { fileURLToPath } from "url";
import { users, posts } from "./seed-data/index.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/post.js";
import { varifyToken } from "./middlewares/auth.js";

/* Configurations */

dotenv.config();
let app = express();
let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* File Storage */

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export let upload = multer({ storage });

/* Routes with files */

app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", varifyToken, upload.single("picture"), createPost);

/* Routes */

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);

/* Database setup */

let PORT = process.env.PORT || 8001;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is live at Port ${PORT}`);
    });
    /* Add Seed Data One Time */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch(() => {
    console.log("database connection failed");
  });
