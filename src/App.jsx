import { useAuth } from "./hooks/useAuth";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { user, loading, login, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.error("Erreur de déconnexion :", error.message);
      throw error;
    }
  }

  return (
    <AppRoutes
      user={user}
      loading={loading}
      onLoginSuccess={login}
      onLogout={handleLogout}
    />
  );
}

export default App;
