import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const token = localStorage.getItem("token");
    

  // Not logged in (allow for public)
  if (!token) {
    return children;
  }

  try {
    const decoded = jwtDecode(token);
    const role = decoded.role;

    // move to there dahshboard
    if (role === "student") {
      return <Navigate to="/student-dashboard" />;
    } else if (role === "staff") {
      return <Navigate to="/staff-dashboard" />;
    } else if (role === "admin") {
      return <Navigate to="/admin-dashboard" />;
    }

    return <Navigate to="/" />;
  } catch (error) {
    // Invalid token(not logged in)
    return children;
  }
}

export default PublicRoute;