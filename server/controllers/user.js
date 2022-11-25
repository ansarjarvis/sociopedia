import User from "../models/user.js";
/* Read */
export let getUser = async (req, res) => {
  try {
    let { id } = req.param;
    let foundUser = await User.findById(id);
    res.status(200).json(foundUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export let getUserFriends = async (req, res) => {
  try {
    let { id } = req.param;
    let foundUser = await User.findById(id);
    let friends = await Promise.all(
      foundUser.friends.map((id) => User.findById(id))
    );

    let formattedFriends = friends.map(
      ({ _id, firstname, lastname, occupation, location, picturePath }) => {
        return { _id, firstname, lastname, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* Update  */

export let addRemoveFriend = async (req, res) => {
  try {
    let { id, friendId } = req.param;
    let foundUser = await User.findById(id);
    let foundFriend = await User.findById(friendId);
    if (foundUser.friends.includes(friendId)) {
      foundUser.friends = foundUser.friends.filter((id) => id !== friendId);
      foundFriend.friends = foundFriend.friends.filter((id) => id !== id);
    } else {
      foundUser.friends.push(friendId);
      foundFriend.friends.push(id);
    }
    await foundFriend.save();
    await foundUser.save();

    let friends = await Promise.all(
      foundUser.friends.map((id) => User.findById(id))
    );

    let formattedFriends = friends.map(
      ({ _id, firstname, lastname, occupation, location, picturePath }) => {
        return { _id, firstname, lastname, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
