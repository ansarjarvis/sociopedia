import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "store";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

let Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { _id } = useSelector((state) => state.user);
  let token = useSelector((state) => state.token);
  let friends = useSelector((state) => state.user.friends);
  let { palette } = useTheme();
  let primaryLight = palette.primary.light;
  let primaryDark = palette.primary.dark;
  let medium = palette.neutral.medium;
  let main = palette.neutral.main;

  let isFriend = friends.find((friend) => friend._id === friendId);

  let patchFriend = async () => {
    let response = await fetch(
      `http://localhost:8000/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    let data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <>
      <FlexBetween>
        <FlexBetween gap="1rem">
          <UserImage image={userPicturePath} size="55px" />
          <Box
            onClick={() => {
              navigate(`/profile/${friendId}`);
              navigate(0);
            }}
          >
            <Typography
              color={main}
              variant="h5"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {name}
            </Typography>
            <Typography color={medium} fontSize="0.75rem">
              {subtitle}
            </Typography>
          </Box>
        </FlexBetween>
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      </FlexBetween>
    </>
  );
};

export default Friend;
