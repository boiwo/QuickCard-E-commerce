from werkzeug.security import generate_password_hash
from app import app, db
from models import User, Product

with app.app_context():
    # Drop all tables and recreate them
    db.drop_all()
    db.create_all()

    # Create admin user
    admin = User(
        username="admin",
        email="admin@example.com",
        password=generate_password_hash("admin123"),
        is_admin=True
    )
    db.session.add(admin)

    # Add some products
    products = [
        Product(name="PlayStation 5", description="Latest Sony console", price=499.99, image="ps5.jpg"),
        Product(name="Xbox Series X", description="Microsoft gaming console", price=499.99, image="xbox.jpg"),
        Product(name="Nintendo Switch", description="Portable console", price=299.99, image="switch.jpg"),
        Product(name="iPhone 15", description="Latest Apple smartphone", price=1200.99, image="iphone15.jpg"),
    ]
    db.session.add_all(products)

    db.session.commit()
    print("✅ Database seeded successfully!")
