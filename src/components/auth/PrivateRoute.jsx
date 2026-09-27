import { jwtDecode } from "jwt-decode";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children, allowedRoles= [] }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  try {
    const decoded = jwtDecode(token);
    const role = decoded.role;

    if (decoded.exp && decoded.exp * 1000 <= Date.now()) {
      localStorage.removeItem("token");
      return <Navigate to="/login" replace state={{ from: location }} />;
    }

    if (!allowedRoles.includes(role)) {
      return <Navigate to="/unauthorized" />;
    }

    return children;
  } catch (error) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
}

export default PrivateRoute;