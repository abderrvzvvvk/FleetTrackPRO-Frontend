
import { Outlet } from "react-router-dom";
import "./DashboardLayout.css";
import Sidebar from "./Sidebar";

function DashboardLayout({
  title,
  menuItems,
  user,
  onLogout,
}) {
  return (
    <div className="dashboard">
      <Sidebar
        menuItems={menuItems}
        onLogout={onLogout}
      />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>{title}</h1>
            <p>Bienvenue sur FleetTrackPRO</p>
          </div>

          <div className="dashboard-user">
            <span>{user?.prenom} {user?.nom}</span>
            <span className="dashboard-role">{user?.role}</span>
          </div>
        </header>

        <section className="dashboard-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default DashboardLayout;
