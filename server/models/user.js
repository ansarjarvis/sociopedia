import mongoose from "mongoose";

let UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 2,
  },
  friends: {
    type: Array,
    default: [],
  },
  picturePath: {
    type: String,
    default: "",
  },
  location: String,
  occupation: String,
  profileViewed: Number,
  impressions: Number,
});

let User = mongoose.model("User", UserSchema);
export default User;
