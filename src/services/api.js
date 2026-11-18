
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

// Camions
export const camionApi = {
  getAll: () => apiRequest("/camions"),

  getById: (id) => apiRequest(`/camions/${id}`),

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
    apiRequest(`/camions/${id}`, {
      method: "DELETE",
    }),
};

// Utilisateurs
export const userApi = {
  getAll: () => apiRequest("/users"),

  getPending: () => apiRequest("/users/pending"),

  getById: (id) => apiRequest(`/users/${id}`),

  update: (id, data) =>
    apiRequest(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  validate: (id) =>
    apiRequest(`/users/${id}/validate`, {
      method: "PATCH",
    }),

  reject: (id) =>
    apiRequest(`/users/${id}/reject`, {
      method: "PATCH",
    }),

  suspend: (id) =>
    apiRequest(`/users/${id}/suspend`, {
      method: "PATCH",
    }),

  reactivate: (id) =>
    apiRequest(`/users/${id}/reactivate`, {
      method: "PATCH",
    }),
};
