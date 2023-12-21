import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <Box sx={{ bgcolor: "primary.main", color: "text.primary" }}>
      <Typography sx={{ color: "text.primary", textDecoration: "none" }}>
        <Link style={{ textDecoration: "none" }} to={`/dashboard`}>
          Dashboard
        </Link>
      </Typography>
    </Box>
  );
}
