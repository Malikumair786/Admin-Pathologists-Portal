import { OrganizationProfile } from "@clerk/clerk-react";
import FlexBetween from "component/FlexBetween";
import { shadesOfPurple } from "@clerk/themes";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";

export default function OrganizationProfilepage() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <FlexBetween>
      <OrganizationProfile 
      appearance={{
        variables: {
          // colorPrimary: theme.palette.background.alt,
          // colorText: theme.palette.secondary[100],
          // colorBackground: theme,
          }
      }}  
      />;
    </FlexBetween>
  );
}
