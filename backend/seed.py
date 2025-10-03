from app import app, db
from models import Product, User

default_products = [
    {"name": "MacBook Air", "description": "Lightweight laptop", "price": 1200, "stock": 5, "image_url": "https://store.apple.com/macbook.jpg"},
    {"name": "iPhone 14", "description": "Latest smartphone", "price": 1000, "stock": 10, "image_url": "https://store.apple.com/iphone.jpg"},
    {"name": "Adidas Shoes", "description": "Sports shoes", "price": 850, "stock": 10, "image_url": "https://picsum.photos/seed/adidas/600/400"},
    {"name": "Nike Shoes", "description": "Running shoes", "price": 900, "stock": 6, "image_url": "https://picsum.photos/seed/nike1/600/400"},
    {"name": "Nike Shoes", "description": "Running shoes", "price": 950, "stock": 8, "image_url": "https://picsum.photos/seed/nike2/600/400"}
]

default_users = [
    {"username": "alice", "email": "alice@example.com", "password": "123456"},
    {"username": "bob", "email": "bob@example.com", "password": "123456"}
]

with app.app_context():
    db.create_all()

    # Seed Products
    for p in default_products:
        if not Product.query.filter_by(name=p["name"]).first():
            db.session.add(Product(**p))

    # Seed Users
    for u in default_users:
        if not User.query.filter_by(email=u["email"]).first():
            db.session.add(User(**u))

    db.session.commit()
    print("✅ Database seeded with products + users (no duplicates)")
