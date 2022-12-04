import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFriends } from "store";

let FriendListWidget = ({ userId }) => {
  let dispatch = useDispatch();
  let { palette } = useTheme();
  let token = useSelector((state) => state.token);
  let friends = useSelector((state) => state.user.friends);

  let getFriends = async () => {
    let response = await fetch(
      `http://localhost:8000/users/${userId}/friends`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <WidgetWrapper>
        <Typography
          color={palette.neutral.dark}
          variant="h5"
          fontWeight="500"
          sx={{ mb: "1.5rem" }}
        >
          Friend List
        </Typography>
        <Box display="flex" flexDirection="column" gap="1.5rem">
          {friends.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))}
        </Box>
      </WidgetWrapper>
    </>
  );
};

export default FriendListWidget;
