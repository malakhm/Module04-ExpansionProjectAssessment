import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.js";
import { useContext } from "react";

const UserProtectedRoute = () => {
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/signin");
  } else {
    // Check if the user is an admin
    if (!token ) {
     
      // If not authenticated, redirect to the login page
        return <Navigate to="/signin" />;
      }
    }

    // If authenticated, render the child routes
    return <Outlet />;
  }

export default UserProtectedRoute;
