
import { useEffect, useState } from "react";
import { authApi } from "../services/api";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function checkSession() {
      try {
        const result = await authApi.getMe(controller.signal);

        if (result.success && result.data?.user) {
          setUser(result.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setUser(null);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    checkSession();

    return () => controller.abort();
  }, []);

  function login(userData) {
    setUser(userData);
  }

  async function logout() {
    await authApi.logout();
    setUser(null);
  }

  return { user, loading, login, logout };
}
