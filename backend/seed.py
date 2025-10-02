from app import app, db
from models import Product, User, ContactMessage
from faker import Faker
import random

fake = Faker()

with app.app_context():
    # Reset database (fresh start each run)
    db.drop_all()
    db.create_all()

    # --- Seed dynamic products ---
    for _ in range(5):  # create 5 random products
        product = Product(
            name=fake.word().capitalize() + " " + fake.word().capitalize(),
            description=fake.sentence(),
            price=round(random.uniform(10, 2000), 2),
            stock=random.randint(1, 100),
            image_url=f"https://picsum.photos/seed/{random.randint(1,1000)}/600/400"
        )
        db.session.add(product)
    print("✅ Products seeded dynamically.")

    # --- Seed dynamic users ---
    for _ in range(3):  # create 3 random users
        username = fake.user_name()
        password = "password123"  # default for testing
        user = User(username=username)
        user.set_password(password)
        db.session.add(user)
    print("✅ Users seeded dynamically.")

    # --- Seed dynamic contact messages ---
    for _ in range(3):  # create 3 random contact messages
        contact = ContactMessage(
            full_name=fake.name(),
            email=fake.email(),
            subject=fake.sentence(nb_words=4),
            message=fake.text(max_nb_chars=200)
        )
        db.session.add(contact)
    print("✅ Contact messages seeded dynamically.")

    db.session.commit()
    print("🎉 Database seeding complete with dynamic data!")

