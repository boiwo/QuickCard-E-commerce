from app import app, db
from models import Product, User

# Put all products in one list (easy to extend)
default_products = [
    {
        "name": "MacBook Air",
        "description": "Lightweight laptop",
        "price": 1200,
        "stock": 5,
        "image_url": "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg"
    },
    {
        "name": "iPhone 14",
        "description": "Latest smartphone",
        "price": 1000,
        "stock": 10,
        "image_url": "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg"
    },
    {
        "name": "Adidas Shoes",
        "description": "Sports shoes",
        "price": 850,
        "stock": 10,
        "image_url": "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg"
    },
    {
        "name": "Nike Shoes",
        "description": "Running shoes",
        "price": 900,
        "stock": 6,
        "image_url": "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg"
    },
    {
        "name": "Nike Shoes Pro",
        "description": "Premium running shoes",
        "price": 950,
        "stock": 8,
        "image_url": "https://images.pexels.com/photos/1038628/pexels-photo-1038628.jpeg"
    },
    {
        "name": "Wireless Headphones",
        "description": "Noise-cancelling over-ear headphones",
        "price": 300,
        "stock": 15,
        "image_url": "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg"
    }
]

default_users = [
    {"username": "alice", "email": "alice@example.com", "password": "123456"},
    {"username": "bob", "email": "bob@example.com", "password": "123456"}
]

with app.app_context():
    db.create_all()

    # Dynamic product seeding: update if exists, else insert
    for p in default_products:
        product = Product.query.filter_by(name=p["name"]).first()
        if product:
            # update existing fields
            product.description = p["description"]
            product.price = p["price"]
            product.stock = p["stock"]
            product.image_url = p["image_url"]
        else:
            db.session.add(Product(**p))

    # Dynamic user seeding (same logic)
    for u in default_users:
        user = User.query.filter_by(email=u["email"]).first()
        if not user:
            db.session.add(User(**u))

    db.session.commit()
    print("✅ Database dynamically seeded/updated with products + users")
