import { extendTheme } from "@chakra-ui/react";
const breakpoints = {
  sm: "768px",
  md: "1440px",
  "2xl": "1536px",
};
const theme = extendTheme({
  breakpoints,
  colors: {
    lightThemeBlack: "rgba(12, 14, 22, 1)",
    hashColor: "rgba(126, 136, 195, 1)",
    lightThemeGrey: "rgba(133, 139, 178, 1)",
    darkThemeGrey: "#888EB0",
    darkThemeWhite: "rgba(255, 255, 255, 1)",
    darkThemeBg: "#141625",
    darkThemeInput: "#1E2139",
    darkThemeGreyWhite: "#DFE3FA",
  },
});
export default theme;
