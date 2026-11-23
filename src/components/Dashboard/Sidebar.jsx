
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ menuItems, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>
          FleetTrack<span>PRO</span>
        </h2>
        <small>Transport Management</small>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button className="sidebar-logout" onClick={onLogout}>
        Se déconnecter
      </button>
    </aside>
  );
}

export default Sidebar;
