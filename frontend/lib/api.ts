const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const api = {
  // Кухни
  getCuisines: async (page = 1, limit = 10) => {
    const res = await fetch(`${API_URL}/api/cuisines?page=${page}&limit=${limit}`);
    return res.json();
  },
  
  getCuisine: async (id: string) => {
    const res = await fetch(`${API_URL}/api/cuisines/${id}`);
    return res.json();
  },
  
  createCuisine: async (data: any) => {
    const res = await fetch(`${API_URL}/api/cuisines`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  
  updateCuisine: async (id: string, data: any) => {
    const res = await fetch(`${API_URL}/api/cuisines/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  
  deleteCuisine: async (id: string) => {
    return fetch(`${API_URL}/api/cuisines/${id}`, { method: "DELETE" });
  },
  
  searchCuisines: async (q: string) => {
    const res = await fetch(`${API_URL}/api/cuisines/search?q=${encodeURIComponent(q)}`);
    return res.json();
  },
  
  // Рецепты
  getRecipes: async (page = 1, limit = 10, cuisineId?: string) => {
    const params = new URLSearchParams();
    params.append("page", String(page));
    params.append("limit", String(limit));
    if (cuisineId) params.append("cuisineId", cuisineId);
    const res = await fetch(`${API_URL}/api/recipes?${params.toString()}`);
    return res.json();
  },
  
  getRecipe: async (id: string) => {
    const res = await fetch(`${API_URL}/api/recipes/${id}`);
    return res.json();
  },
  
  createRecipe: async (data: any) => {
    const res = await fetch(`${API_URL}/api/recipes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  
  updateRecipe: async (id: string, data: any) => {
    const res = await fetch(`${API_URL}/api/recipes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  
  deleteRecipe: async (id: string) => {
    return fetch(`${API_URL}/api/recipes/${id}`, { method: "DELETE" });
  },
  
  searchRecipes: async (q: string) => {
    const res = await fetch(`${API_URL}/api/recipes/search?q=${encodeURIComponent(q)}`);
    return res.json();
  },
};