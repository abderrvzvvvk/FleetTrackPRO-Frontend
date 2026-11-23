
import { Navigate, Outlet } from "react-router-dom";

function RequireRole({ user, allowedRoles }) {
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}

export default RequireRole;
