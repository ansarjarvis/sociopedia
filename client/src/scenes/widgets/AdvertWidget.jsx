import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

let AdvertWidget = () => {
  let { palette } = useTheme();
  let dark = palette.neutral.dark;
  let main = palette.neutral.main;
  let medium = palette.neutral.medium;
  return (
    <>
      <WidgetWrapper>
        <FlexBetween>
          <Typography color={dark} variant="h5" fontWeight="500">
            Sponsored
          </Typography>
          <Typography color={medium}>Create Ad</Typography>
        </FlexBetween>
        <img
          width="100%"
          height="auto"
          alt="advert"
          src="http://localhost:8000/assets/info4.jpeg"
          style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
        />
        <FlexBetween>
          <Typography color={main}>Some Random Cosmetics</Typography>
          <Typography color={medium}>SomeRandomCosmetics.com</Typography>
        </FlexBetween>
        <Typography color={medium} m="0.5rem 0">
          blah blah blah to your skin...........
        </Typography>
      </WidgetWrapper>
    </>
  );
};

export default AdvertWidget;
