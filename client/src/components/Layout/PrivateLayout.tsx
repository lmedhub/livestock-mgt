import { Box } from "@mui/material";
import Navbar from "../NavBar";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";

export default function PrivateLayout() {
  return (
    <Box>
      <>
        Private Layout:
        <Navbar />
        <Suspense fallback={<Box>Loading</Box>}>
          <Outlet />
        </Suspense>
      </>
    </Box>
  );
}
