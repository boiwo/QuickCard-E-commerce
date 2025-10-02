from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Product, User, Cart, Order, Contact
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URL", "sqlite:///quickcart.db")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
CORS(app)
@app.route("/")
def api_index():
    return """
    <h1>QuickCart API Endpoints</h1>
    <ul>
        <li>/api/users (GET, PUT, DELETE)</li>
        <li>/api/users/register (POST)</li>
        <li>/api/users/login (POST)</li>
        <li>/api/products (GET, POST)</li>
        <li>/api/products/&lt;id&gt; (GET, PUT, DELETE)</li>
        <li>/api/cart (GET, POST)</li>
        <li>/api/cart/&lt;id&gt; (PUT, DELETE)</li>
        <li>/api/orders (GET, POST)</li>
        <li>/api/orders/&lt;id&gt; (PUT, DELETE)</li>
        <li>/api/contacts (GET, POST)</li>
        <li>/api/contacts/&lt;id&gt; (PUT, DELETE)</li>
        <li>/api/health (GET)</li>
    </ul>
    """

# ----------------- HEALTH -----------------
@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})

# ----------------- PRODUCTS -----------------
@app.route("/api/products", methods=["GET", "POST"])
def products():
    if request.method == "GET":
        return jsonify([{
            "id": p.id,
            "name": p.name,
            "description": p.description,
            "price": p.price,
            "stock": p.stock,
            "image_url": p.image_url
        } for p in Product.query.all()])
    p = Product(**request.json)
    db.session.add(p)
    db.session.commit()
    return jsonify({"message": "Product added", "id": p.id}), 201

@app.route("/api/products/<int:id>", methods=["GET", "PUT", "DELETE"])
def product_detail(id):
    p = Product.query.get_or_404(id)
    if request.method == "GET":
        return jsonify({
            "id": p.id,
            "name": p.name,
            "description": p.description,
            "price": p.price,
            "stock": p.stock,
            "image_url": p.image_url
        })
    if request.method == "PUT":
        for k, v in request.json.items():
            setattr(p, k, v)
        db.session.commit()
        return jsonify({"message": "Product updated"})
    db.session.delete(p) if request.method == "DELETE" else None
    db.session.commit() if request.method == "DELETE" else None
    if request.method == "DELETE":
        return jsonify({"message": "Product deleted"})

# ----------------- USERS -----------------
@app.route("/api/users/register", methods=["POST"])
def register():
    u = User(**request.json)
    db.session.add(u)
    db.session.commit()
    return jsonify({"message": "User registered", "id": u.id})

@app.route("/api/users/login", methods=["POST"])
def login():
    data = request.json
    user = User.query.filter_by(email=data.get("email")).first()
    if user and user.password == data.get("password"):
        return jsonify({"message": "Login success", "id": user.id})
    return jsonify({"message": "Invalid credentials"}), 401

@app.route("/api/users", methods=["GET"])
def list_users():
    return jsonify([{"id": u.id, "username": u.username, "email": u.email} for u in User.query.all()])

@app.route("/api/users/<int:id>", methods=["PUT", "DELETE"])
def user_detail(id):
    u = User.query.get_or_404(id)
    if request.method == "PUT":
        for k, v in request.json.items():
            setattr(u, k, v)
        db.session.commit()
        return jsonify({"message": "User updated"})
    if request.method == "DELETE":
        db.session.delete(u)
        db.session.commit()
        return jsonify({"message": "User deleted"})

# ----------------- CART -----------------
@app.route("/api/cart", methods=["GET", "POST"])
def cart():
    if request.method == "GET":
        return jsonify([{
            "id": c.id,
            "user_id": c.user_id,
            "product_id": c.product_id,
            "quantity": c.quantity
        } for c in Cart.query.all()])
    c = Cart(**request.json)
    db.session.add(c)
    db.session.commit()
    return jsonify({"message": "Item added to cart", "id": c.id})

@app.route("/api/cart/<int:id>", methods=["PUT", "DELETE"])
def cart_detail(id):
    c = Cart.query.get_or_404(id)
    if request.method == "PUT":
        c.quantity = request.json.get("quantity", c.quantity)
        db.session.commit()
        return jsonify({"message": "Cart updated"})
    if request.method == "DELETE":
        db.session.delete(c)
        db.session.commit()
        return jsonify({"message": "Cart item deleted"})

# ----------------- ORDERS -----------------
@app.route("/api/orders", methods=["GET", "POST"])
def orders():
    if request.method == "GET":
        return jsonify([{
            "id": o.id,
            "user_id": o.user_id,
            "total": o.total,
            "status": o.status
        } for o in Order.query.all()])
    o = Order(**request.json)
    db.session.add(o)
    db.session.commit()
    return jsonify({"message": "Order created", "id": o.id})

@app.route("/api/orders/<int:id>", methods=["PUT", "DELETE"])
def order_detail(id):
    o = Order.query.get_or_404(id)
    if request.method == "PUT":
        for k, v in request.json.items():
            setattr(o, k, v)
        db.session.commit()
        return jsonify({"message": "Order updated"})
    if request.method == "DELETE":
        db.session.delete(o)
        db.session.commit()
        return jsonify({"message": "Order deleted"})

# ----------------- CONTACTS -----------------
@app.route("/api/contacts", methods=["GET", "POST"])
def contacts():
    if request.method == "GET":
        return jsonify([{
            "id": c.id,
            "name": c.name,
            "email": c.email,
            "message": c.message
        } for c in Contact.query.all()])
    c = Contact(**request.json)
    db.session.add(c)
    db.session.commit()
    return jsonify({"message": "Contact saved", "id": c.id})

@app.route("/api/contacts/<int:id>", methods=["PUT", "DELETE"])
def contact_detail(id):
    c = Contact.query.get_or_404(id)
    if request.method == "PUT":
        for k, v in request.json.items():
            setattr(c, k, v)
        db.session.commit()
        return jsonify({"message": "Contact updated"})
    if request.method == "DELETE":
        db.session.delete(c)
        db.session.commit()
        return jsonify({"message": "Contact deleted"})

# ----------------- RUN -----------------
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
