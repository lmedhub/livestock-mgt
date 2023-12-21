import { Navigate } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/misc/404";
import { lazy } from "react";

const DashBoard = lazy(() => import("../pages/dashboard"));
const MainPage = lazy(() => import("../pages/main"));

export default function PrivateRoutes() {
  return {
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/dashboard", element: <DashBoard /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  };
}
