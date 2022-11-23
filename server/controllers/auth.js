import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export let register = async (req, res) => {
  try {
    let {
      firstname,
      lastname,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    let salt = await bcrypt.genSalt();
    let passwordHash = await bcrypt.hash(password, salt);
    let newUser = new User({
      firstname,
      lastname,
      email,
      passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      profileViewed: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    let savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
