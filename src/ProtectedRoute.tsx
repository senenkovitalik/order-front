import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ redirectPath = "/login" }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirects to the login page, replacing the current entry in the history stack
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Renders the child routes
  return <Outlet />;
};

export default ProtectedRoute;
