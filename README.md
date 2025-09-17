# 🛒 QuickCart E-commerce (Frontend)

QuickCart is a simple e-commerce frontend built with **React + TypeScript + TailwindCSS**.  
It allows users to browse products, search, filter by category/brand, sort, and view details.

---

## 🚀 Features
- 🔍 **Search** products by name or description  
- 🏷 **Filter** by category and brand  
- 💰 **Filter by price range**  
- ↕ **Sort products** (name, price low → high, price high → low, rating)  
- 📱 **Responsive UI** with mobile-friendly filters  
- 🎨 Built with **TailwindCSS** for modern styling  

---

## 🛠 Tech Stack
- **React** (Frontend framework)  
- **TypeScript** (Type safety)  
- **TailwindCSS** (Styling)  
- **Lucide-react** (Icons)  

---

## 📂 Project Structure
frontend/
├── src/
│ ├── components/ # UI components (e.g., ProductCard)
│ ├── data/ # Static products data
│ ├── pages/ # Pages (Shop, Home, etc.)
│ └── services/ # API service (fetch products from backend)
├── public/ # Static assets
├── package.json # Project config
└── README.md # Documentation

Install dependencies

npm install

Start development server

npm run dev

Open in browser:

http://localhost:5173

🌐 Backend API

The project connects to a backend API (Flask + PostgreSQL):

https://quickcard-e-commerce-2.onrender.com/api/products

Example response:

[
  {
    "id": 5,
    "name": "MacBook Air",
    "description": "Lightweight laptop",
    "price": 1200,
    "stock": 5
  }
]

📦 Deployment

Frontend: Deploy on Vercel
 or Netlify

Backend: Hosted on Render

✨ Future Improvements

🛒 Add Cart & Checkout

👤 User Authentication (Login/Register)

⭐ Product Reviews

📦 Admin Dashboard for managing products

👨‍💻 Author

Benard Boiwo
💼 Full-Stack Developer | 🌍 Kenya


---

👉 Do you want me to make it **short & simple** (just installation + features) or keep this **detailed version** with structure and future improvements?
