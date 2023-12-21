import { createTheme } from "@mui/material/styles";
import { amber, grey, blueGrey } from "@mui/material/colors";
import { PaletteMode } from "@mui/material";

export const createCustomTheme = (mode: PaletteMode) => {
  return createTheme({
    palette: {
      mode,

      primary: {
        main: amber[300],
        ...(mode === "dark" && {
          main: amber[900],
        }),
      },
      secondary: {
        ...blueGrey,
        ...(mode === "dark" && {
          main: blueGrey[600],
        }),
      },
      background: {
        default: "#fff",
        ...(mode === "dark" && {
          default: grey[800],
        }),
      },

      text: {
        ...(mode === "dark"
          ? {
              primary: "#fff",
              secondary: grey[500],
            }
          : {
              primary: grey[900],
              secondary: grey[800],
            }),
      },
    },
  });
};
