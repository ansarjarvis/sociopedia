import { Box, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

let ProfilePage = () => {
  let [user, setUser] = useState(null);
  let { userId } = useParams();
  let token = useSelector((state) => state.token);
  let isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    let response = await fetch(`http://localhost:8000/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser().catch(console.log); // eslint-disable-next-line
  }, []);

  if (!user) return null;

  return (
    <>
      <Box>
        <Navbar />
        <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="2rem"
          justifyContent="center"
        >
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <UserWidget userId={userId} picturePath={user.picturePath} />
            <Box m="2rem" />
            <FriendListWidget userId={userId} />
          </Box>
          <Box
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
            <MyPostWidget picturePath={user.picturePath} />
            <Box m="2rem" />
            <PostsWidget userId={userId} isProfile />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProfilePage;
