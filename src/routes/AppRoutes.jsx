
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Login from "../components/Login/Login";
import AdminLayout from "../components/Dashboard/AdminLayout";
import DriverLayout from "../components/Dashboard/DriverLayout";

import RequireAuth from "./RequireAuth";
import RequireRole from "./RequireRole";

import UserList from "../components/Users/UserList";
import CamionList from "../components/Camions/CamionList";
import ChauffeurTrajets from "../components/Trajets/ChauffeurTrajets";
import Unauthorized from "../pages/Unauthorized";

function getHomePath(user) {
  if (!user) return "/login";

  if (user.role === "CHAUFFEUR") return "/chauffeur";

  if (["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
    return "/admin";
  }

  return "/403";
}

function isAllowedPath(path, user) {
  if (path.startsWith("/admin")) {
    return ["ADMIN", "SUPER_ADMIN"].includes(user.role);
  }

  if (path.startsWith("/chauffeur")) {
    return user.role === "CHAUFFEUR";
  }

  return false;
}

function LoginRoute({ user, onLoginSuccess }) {
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogin(userData) {
    onLoginSuccess(userData);

    const requestedPath = location.state?.from?.pathname;

    if (requestedPath && isAllowedPath(requestedPath, userData)) {
      navigate(requestedPath, { replace: true });
    } else {
      navigate(getHomePath(userData), { replace: true });
    }
  }

  if (user) {
    return <Navigate to={getHomePath(user)} replace />;
  }

  return <Login onLoginSuccess={handleLogin} />;
}

function AdminHome() {
  return (
    <div>
      <h2>Vue générale</h2>
      <p>Bienvenue dans votre espace Admin.</p>
    </div>
  );
}

function PendingUsers() {
  return <h2>Demandes en attente</h2>;
}

function RemorquesPage() {
  return <h2>Gestion des remorques — À développer</h2>;
}

function TrajetsPage() {
  return <h2>Gestion des trajets — À développer</h2>;
}

function ChauffeurHome({ user }) {
  return (
    <div>
      <h2>Vue générale</h2>
      <p>Bienvenue {user?.prenom} dans votre espace Chauffeur.</p>
    </div>
  );
}

function NotFound() {
  return <h2>404 — Page introuvable</h2>;
}

function AppRoutes({ user, loading, onLoginSuccess, onLogout }) {
  const navigate = useNavigate();

  async function handleLogout() {
    await onLogout();
    navigate("/login", { replace: true });
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <LoginRoute
            user={user}
            onLoginSuccess={onLoginSuccess}
          />
        }
      />

      <Route path="/403" element={<Unauthorized />} />

      <Route element={<RequireAuth user={user} loading={loading} />}>
        <Route path="/" element={<Navigate to={getHomePath(user)} replace />} />

        <Route element={<RequireRole user={user} allowedRoles={["ADMIN", "SUPER_ADMIN"]} />}>
          <Route
            path="/admin"
            element={<AdminLayout user={user} onLogout={handleLogout} />}
          >
            <Route index element={<AdminHome />} />
            <Route path="utilisateurs" element={<UserList currentUser={user} />} />
            <Route path="camions" element={<CamionList />} />
            <Route path="remorques" element={<RemorquesPage />} />
            <Route path="remorques/nouveau" element={<RemorquesPage />} />
            <Route path="remorques/:id" element={<RemorquesPage />} />
            <Route path="trajets" element={<TrajetsPage />} />
            <Route path="trajets/nouveau" element={<TrajetsPage />} />
            <Route path="trajets/:id" element={<TrajetsPage />} />
            <Route path="demandes-en-attente" element={<PendingUsers />} />
          </Route>
        </Route>

        <Route element={<RequireRole user={user} allowedRoles={["CHAUFFEUR"]} />}>
          <Route
            path="/chauffeur"
            element={<DriverLayout user={user} onLogout={handleLogout} />}
          >
            <Route index element={<ChauffeurHome user={user} />} />
            <Route path="trajets" element={<ChauffeurTrajets />} />
            <Route path="trajets/:id" element={<h2>Détail du trajet — À développer</h2>} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
