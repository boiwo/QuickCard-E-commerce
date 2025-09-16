from app import app, db
from models import Product, User, ContactMessage

with app.app_context():
    # Reset database (optional – uncomment if you want a clean start each time)
    # db.drop_all()
    db.create_all()

    # Seed sample products
    if not Product.query.first():
        p1 = Product(name="PlayStation 5", description="Next-gen console", price=499.99, stock=10)
        p2 = Product(name="iPhone 15", description="Latest Apple smartphone", price=999.99, stock=20)
        p3 = Product(name="Nike Shoes", description="Running shoes", price=120.00, stock=50)

        db.session.add_all([p1, p2, p3])
        print("✅ Products seeded.")

    # Seed a sample user
    if not User.query.first():
        user = User(username="admin")
        user.set_password("admin123")  # hashed automatically
        db.session.add(user)
        print("✅ User seeded (username: admin, password: admin123).")

    # Seed sample contact messages
    if not ContactMessage.query.first():
        c1 = ContactMessage(
            full_name="John Doe",
            email="john@example.com",
            subject="Order inquiry",
            message="I need help with my order."
        )
        c2 = ContactMessage(
            full_name="Jane Smith",
            email="jane@example.com",
            subject="Product availability",
            message="When will the PS5 be back in stock?"
        )
        db.session.add_all([c1, c2])
        print("✅ Contact messages seeded.")

    db.session.commit()
    print("🎉 Database seeding complete!")

