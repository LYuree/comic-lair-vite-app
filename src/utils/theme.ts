import { createTheme } from "@mui/material/styles";

// Create a custom theme
const customTheme = createTheme({
  palette: {
    primary: {
      main: "#bd0000", // Replace with your desired primary color
    },
  },
  typography: {
    fontFamily: `"Montserrat", "Arial", "sans-serif"`,
  },
});

export default customTheme;
