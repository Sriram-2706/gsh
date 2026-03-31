import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // hospital blue
    },
    secondary: {
      main: "#4caf50", // calm green
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

export default theme;