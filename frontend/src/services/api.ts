const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function fetchJSON(url: string, options?: RequestInit) {
  const response = await fetch(url, { ...options, headers: { "Content-Type": "application/json" } });
  if (!response.ok) throw new Error(await response.text() || "Network response was not ok");
  return response.json();
}

export async function getProducts() {
  console.log("Fetching products from:", `${API_BASE_URL}/api/products`);
  return fetchJSON(`${API_BASE_URL}/api/products`);
}
