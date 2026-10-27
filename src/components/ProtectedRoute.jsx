import { Outlet, Navigate } from "react-router-dom";
import { isLoggedIn } from "../auth/index.js"; // Adjust path to your auth helper

const ProtectedRoute = () => {
    // If the user is logged in, show the requested component (Outlet)
    // If not, redirect them to the login page
    return isLoggedIn() ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default ProtectedRoute;