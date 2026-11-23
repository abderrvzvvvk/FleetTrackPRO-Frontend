
import DashboardLayout from "./DashboardLayout";

function AdminLayout({ user, onLogout }) {
  const menuItems = [
    { id: "overview", label: "Vue générale", path: "/admin", end: true },
    { id: "users", label: "Utilisateurs", path: "/admin/utilisateurs" },
    { id: "camions", label: "Camions", path: "/admin/camions" },
    { id: "remorques", label: "Remorques", path: "/admin/remorques" },
    { id: "trajets", label: "Trajets", path: "/admin/trajets" },
  ];

  return (
    <DashboardLayout
      title={user?.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
      menuItems={menuItems}
      user={user}
      onLogout={onLogout}
    />
  );
}

export default AdminLayout;
