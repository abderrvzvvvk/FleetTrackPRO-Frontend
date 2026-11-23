
const API_BASE_URL = "http://localhost:3000/api";

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(
      result?.message || "Une erreur est survenue."
    );

    error.status = response.status;
    error.data = result;

    throw error;
  }

  return result;
}

// Authentification
export const authApi = {
  login: (data) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getMe: (signal) =>
    apiRequest("/auth/me", { signal }),

  logout: () =>
    apiRequest("/auth/logout", { method: "POST" }),
};

// Camions
export const camionApi = {
  getAll: (signal) => apiRequest("/camions", { signal }),

  getById: (id, signal) =>
    apiRequest(`/camions/${id}`, { signal }),

  create: (data) =>
    apiRequest("/camions", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiRequest(`/camions/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    apiRequest(`/camions/${id}`, { method: "DELETE" }),
};

// Utilisateurs
export const userApi = {
  getAll: (signal) => apiRequest("/users", { signal }),

  getPending: (signal) =>
    apiRequest("/users/pending", { signal }),

  getById: (id, signal) =>
    apiRequest(`/users/${id}`, { signal }),

  update: (id, data) =>
    apiRequest(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  validate: (id) =>
    apiRequest(`/users/${id}/validate`, { method: "PATCH" }),

  reject: (id) =>
    apiRequest(`/users/${id}/reject`, { method: "PATCH" }),

  suspend: (id) =>
    apiRequest(`/users/${id}/suspend`, { method: "PATCH" }),

  reactivate: (id) =>
    apiRequest(`/users/${id}/reactivate`, { method: "PATCH" }),
};

// Trajets
export const trajetApi = {
  getAll: (signal) => apiRequest("/trajets", { signal }),

  getById: (id, signal) =>
    apiRequest(`/trajets/${id}`, { signal }),
};
