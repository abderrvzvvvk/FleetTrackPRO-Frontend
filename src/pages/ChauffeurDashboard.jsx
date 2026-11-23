import { useState } from "react";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import ChauffeurTrajets from "../components/Trajets/ChauffeurTrajets";

function ChauffeurDashboard({ onLogout, user }) {
  const [activeSection, setActiveSection] = useState("overview");

  const menuItems = [
    { id: "overview", label: "Vue générale" },
    { id: "trips", label: "Mes trajets" },
  ];

  function renderContent() {
    switch (activeSection) {
      case "trips":
        return <ChauffeurTrajets />;

      default:
        return (
          <div>
            <h2>Vue générale</h2>
            <p>Bienvenue dans votre espace Chauffeur.</p>
          </div>
        );
    }
  }

  return (
    <DashboardLayout
      title="Espace Chauffeur"
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

export default ChauffeurDashboard;
