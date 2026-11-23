
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth({ user, loading }) {
  const location = useLocation();

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}

export default RequireAuth;
