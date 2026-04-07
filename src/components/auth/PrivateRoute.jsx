import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children, allowedRoles= [] }) {
  const token = localStorage.getItem("token");
   

  //  Not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    const role = decoded.role;

    // role not allowed
    if (!allowedRoles.includes(role)) {
      return <Navigate to="/unauthorized" />;
    }

    // Allowed
    return children;
  } catch (error) {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;