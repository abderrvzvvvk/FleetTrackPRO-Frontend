import { useState } from "react";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import CamionList from "../components/Camions/CamionList";
import UserList from "../components/Users/UserList";

function AdminDashboard({ onLogout, user }) {
  const [activeSection, setActiveSection] = useState("overview");

  const menuItems = [
    { id: "overview", label: "Vue générale" },
    { id: "users", label: "Utilisateurs" },
    { id: "camions", label: "Camions" },
    { id: "pending", label: "Demandes en attente" },
  ];

  function renderContent() {
    switch (activeSection) {
      case "drivers":
        return (
          <div>
            <h2>Gestion des chauffeurs</h2>
            <p>Gérez les comptes des chauffeurs.</p>
          </div>
        );

      case "camions":
        return <CamionList />;

      case "pending":
        return (
          <div>
            <h2>Demandes en attente</h2>
            <p>
              Consultez les demandes des chauffeurs en attente de validation.
            </p>
          </div>
        );

      case "users":
        return <UserList currentUser={user} />;

      default:
        return (
          <div>
            <h2>Vue générale</h2>
            <p>Bienvenue dans votre espace Admin.</p>
          </div>
        );
    }
  }

  return (
    <DashboardLayout
      title="Admin"
      menuItems={menuItems}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      user={user}
      onLogout={onLogout}
    >
      {renderContent()}
    </DashboardLayout>
  );
}

export default AdminDashboard;
