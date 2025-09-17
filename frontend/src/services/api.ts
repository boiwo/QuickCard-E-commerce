// src/services/api.ts
const API_BASE_URL = "https://quickcard-e-commerce-2.onrender.com";

export async function getProducts() {
  const response = await fetch(`${API_BASE_URL}/api/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}
