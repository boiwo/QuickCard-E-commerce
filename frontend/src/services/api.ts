// ✅ Use Vite's env variable system
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Fetch all products
export async function getProducts() {
  const response = await fetch(`${API_BASE_URL}/api/products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
}

// Fetch a single product by ID
export async function getProductById(id: number) {
  const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  return response.json();
}

// Add product to cart
export async function addToCart(userId: number, productId: number, quantity = 1) {
  const response = await fetch(`${API_BASE_URL}/api/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, product_id: productId, quantity }),
  });
  if (!response.ok) {
    throw new Error("Failed to add to cart");
  }
  return response.json();
}
