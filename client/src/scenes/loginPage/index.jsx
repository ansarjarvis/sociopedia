import InputForm from "./InputForm";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

let LoginPage = () => {
  let theme = useTheme();
  let isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"
          textAlign="center"
        >
          SocioPedia
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Sociopedia , the Social Media for Sociopaths !!
        </Typography>
        <InputForm></InputForm>
      </Box>
    </Box>
  );
};

export default LoginPage;
