import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import { register } from "./controllers/auth.js";
import authRouter from "./routes/auth.js";

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

/* Routes */

app.use("/auth", authRouter);
/* Database setup */

let PORT = process.env.PORT || 8001;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("database connection failed");
  });
