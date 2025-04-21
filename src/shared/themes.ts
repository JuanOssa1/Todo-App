import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3f51b5"
    },
    secondary: {
      main: "#f50057"
    },
    error: { main: "#d32f2f" },
    warning: { main: "#ed6c02" },
    info: { main: "#0288d1" }
  }
});
