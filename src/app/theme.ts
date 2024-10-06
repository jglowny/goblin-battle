"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "TheGoodMonolith, Arial",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#000",
        },
        // ...other tokens
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#fff",
        },
        // ...other tokens
      },
    },
  },
  cssVariables: true,
});

export default theme;
