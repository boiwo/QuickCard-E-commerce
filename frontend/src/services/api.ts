const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// -------------------- HELPER --------------------
async function fetchJSON(url: string, options?: RequestInit) {
  const token = localStorage.getItem("token"); // JWT if needed
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Network response was not ok");
  }
  return response.json();
}

// -------------------- PRODUCTS --------------------
export async function getProducts() {
  return fetchJSON(`${API_BASE_URL}/api/products`);
}

export async function getProductById(id: number) {
  return fetchJSON(`${API_BASE_URL}/api/products/${id}`);
}

// -------------------- CART --------------------
export async function addToCart(userId: number, productId: number, quantity = 1) {
  return fetchJSON(`${API_BASE_URL}/api/cart`, {
    method: "POST",
    body: JSON.stringify({ user_id: userId, product_id: productId, quantity }),
  });
}

export async function getCart(userId: number) {
  return fetchJSON(`${API_BASE_URL}/api/cart/${userId}`);
}

export async function updateCartItem(cartItemId: number, quantity: number) {
  return fetchJSON(`${API_BASE_URL}/api/cart/${cartItemId}`, {
    method: "PUT",
    body: JSON.stringify({ quantity }),
  });
}

export async function removeFromCart(cartItemId: number) {
  return fetchJSON(`${API_BASE_URL}/api/cart/${cartItemId}`, { method: "DELETE" });
}

// -------------------- ORDERS --------------------
export async function placeOrder(userId: number, orderData: any) {
  return fetchJSON(`${API_BASE_URL}/api/orders`, {
    method: "POST",
    body: JSON.stringify({ user_id: userId, ...orderData }),
  });
}

export async function getOrders(userId: number) {
  return fetchJSON(`${API_BASE_URL}/api/orders/${userId}`);
}

// -------------------- USERS --------------------
export async function registerUser(userData: any) {
  return fetchJSON(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export async function loginUser(credentials: any) {
  const data = await fetchJSON(`${API_BASE_URL}/api/users/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
  });
  if (data.token) localStorage.setItem("token", data.token);
  return data;
}

export async function getUserProfile() {
  return fetchJSON(`${API_BASE_URL}/api/users/profile`);
}

