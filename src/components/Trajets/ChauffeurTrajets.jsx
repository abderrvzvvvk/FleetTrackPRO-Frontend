import { useState } from "react";
import { trajetApi } from "../../services/api";
import "./ChauffeurTrajets.css";

function ChauffeurTrajets() {
  const [trajets, setTrajets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  async function handleLoadTrajets() {
    try {
      setLoading(true);
      setError("");

      const response = await trajetApi.getAll();
      setTrajets(response.data || []);
      setLoaded(true);
    } catch (error) {
      if (error.status === 401) {
        setError("Votre session a expiré. Veuillez vous reconnecter.");
      } else if (error.status === 403) {
        setError("Accès refusé.");
      } else {
        setError(error.message || "Impossible de charger les trajets.");
      }
    } finally {
      setLoading(false);
    }
  }

  function getStatusLabel(status) {
    const labels = {
      A_FAIRE: "À faire",
      EN_COURS: "En cours",
      TERMINE: "Terminé",
    };

    return labels[status] || status;
  }

  return (
    <section className="chauffeur-trajets">
      <div className="trajets-header">
        <div>
          <h2>Mes trajets</h2>
          <p>Consultez les trajets qui vous sont affectés.</p>
        </div>

        <button
          type="button"
          className="trajets-refresh-btn"
          onClick={handleLoadTrajets}
          disabled={loading}
        >
          {loading ? "Chargement..." : "Actualiser"}
        </button>
      </div>

      {error && (
        <p className="trajets-error" role="alert">
          {error}
        </p>
      )}

      {loading && <p className="trajets-loading">Chargement des trajets...</p>}

      {!loading && loaded && trajets.length === 0 && (
        <p className="trajets-empty">Aucun trajet ne vous est affecté.</p>
      )}

      {!loading && trajets.length > 0 && (
        <div className="trajets-grid">
          {trajets.map((trajet) => (
            <article className="trajet-card" key={trajet._id}>
              <div className="trajet-card-header">
                <h3>Trajet</h3>

                <span
                  className={`trajet-status trajet-status-${(
                    trajet.statut || ""
                  )
                    .toLowerCase()
                    .replace("_", "-")}`}
                >
                  {getStatusLabel(trajet.statut)}
                </span>
              </div>

              <div className="trajet-route">
                <div className="trajet-location">
                  <div className="trajet-location-icon">●</div>
                  <div>
                    <small>Départ</small>
                    <strong>{trajet.lieuDepart}</strong>
                  </div>
                </div>

                <div className="trajet-location">
                  <div className="trajet-location-icon">●</div>
                  <div>
                    <small>Destination</small>
                    <strong>{trajet.lieuArrivee}</strong>
                  </div>
                </div>
              </div>

              <div className="trajet-card-divider" />

              <div className="trajet-details">
                <div className="trajet-detail">
                  <span>Marchandise</span>
                  <strong>{trajet.marchandise || "Non renseignée"}</strong>
                </div>

                <div className="trajet-detail">
                  <span>Date de départ</span>
                  <strong>
                    {trajet.dateDepartPrevue
                      ? new Date(trajet.dateDepartPrevue).toLocaleDateString(
                          "fr-FR",
                        )
                      : "Non définie"}
                  </strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ChauffeurTrajets;
