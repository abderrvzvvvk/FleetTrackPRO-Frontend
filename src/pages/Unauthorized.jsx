
import { useNavigate } from "react-router-dom";
import "./Unauthorized.css";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-page">
      <div className="unauthorized-card">
        <div className="unauthorized-icon">403</div>

        <h1>Accès refusé</h1>

        <p>
          Vous n'avez pas les autorisations nécessaires pour accéder à cette
          page.
        </p>

        <div className="unauthorized-actions">
          <button
            className="unauthorized-btn primary"
            onClick={() => navigate(-1)}
          >
            Retour
          </button>

          <button
            className="unauthorized-btn secondary"
            onClick={() => navigate("/login", { replace: true })}
          >
            Se connecter
          </button>
        </div>

        <span className="unauthorized-footer">
          FleetTrackPRO — Transport Management
        </span>
      </div>
    </div>
  );
}

export default Unauthorized;
