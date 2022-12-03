import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

/* Register */

export let register = async (req, res) => {
  try {
    let {
      firstName,
      lastName,
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
      firstName,
      lastName,
      email,
      password: passwordHash,
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

/* Login */

export let login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let foundUser = await User.findOne({ email: email });
    if (!foundUser) return res.status(400).json({ mes: "User does not exist" });

    let isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) return res.status(400).json({ mes: "Invalid credentials" });

    let token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET);
    delete foundUser.password;
    res.status(200).json({ token, foundUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
