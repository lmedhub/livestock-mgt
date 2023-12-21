import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../providers/colorMode";

export default function Navbar() {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "primary.main",
        color: "text.primary",
        p: 3,
      }}
    >
      <Typography>{theme.palette.mode} mode</Typography>
      <IconButton onClick={colorMode.toggleColorMode} color="inherit">
        Change
      </IconButton>
    </Box>
  );
}
