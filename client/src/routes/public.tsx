import { Navigate } from "react-router-dom";
import App from "../App";
import LoginForm from "../pages/auth/components/login";

export default function PublicRoutes() {
  return {
    element: <App />,
    children: [
      { path: "/login", element: <LoginForm /> },
      { path: "*", element: <Navigate to="/login" replace /> },
    ],
  };
}
