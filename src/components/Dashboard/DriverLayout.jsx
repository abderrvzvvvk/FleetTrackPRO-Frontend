
import DashboardLayout from "./DashboardLayout";

function DriverLayout({ user, onLogout }) {
  const menuItems = [
    { id: "overview", label: "Vue générale", path: "/chauffeur", end: true },
    {
      id: "trips",
      label: "Mes trajets",
      path: "/chauffeur/trajets",
    },
  ];

  return (
    <DashboardLayout
      title="Espace Chauffeur"
      menuItems={menuItems}
      user={user}
      onLogout={onLogout}
    />
  );
}

export default DriverLayout;
