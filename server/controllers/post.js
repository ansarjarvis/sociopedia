import Post from "../models/post.js";
import User from "../models/user.js";
/* Create */
export let createPost = async (req, res) => {
  try {
    let { userId, description, picturePath } = req.body;
    let foundUser = await User.findById(userId);
    let newPost = new Post({
      userId,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      location: foundUser.location,
      description,
      userPicturePath: foundUser.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();
    let posts = await Post.find({});
    res.status(200).json({ posts });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* Read */
export let getFeedPosts = async (req, res) => {
  try {
    let posts = await Post.find({});
    res.status(200).json(posts);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export let getUserPosts = async (req, res) => {
  try {
    let { userId } = req.params;
    let posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* Update */

export let likePost = async (req, res) => {
  try {
    let { id } = req.params;
    let { userId } = req.body;
    let post = await Post.findById(id);
    let isliked = post.likes.get(userId);
    if (isliked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    let updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        likes: post.likes,
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
