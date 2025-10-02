from flask import Flask, jsonify, request, session, render_template_string
from flask_cors import CORS
from models import db, User, Product, CartItem, Order, ContactMessage
import os

app = Flask(__name__)
app.secret_key = "quickcart-secret"

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DB_PATH = os.path.join(BASE_DIR, "quickcart.sqlite")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + DB_PATH
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
CORS(app)


@app.route("/")
def index():
    html = """
    <h1>QuickCart Backend Endpoints</h1>
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
    return render_template_string(html)

@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})


# ------------------- USERS -------------------
@app.route("/api/users/register", methods=["POST"])
def register():
    data = request.json
    if not data.get("username") or not data.get("password"):
        return jsonify({"error": "username and password required"}), 400
    if User.query.filter_by(username=data["username"]).first():
        return jsonify({"error": "user exists"}), 400
    u = User(username=data["username"])
    u.set_password(data["password"])
    db.session.add(u)
    db.session.commit()
    return jsonify(u.to_dict()), 201


@app.route("/api/users/login", methods=["POST"])
def login():
    data = request.json
    u = User.query.filter_by(username=data.get("username")).first()
    if u and u.check_password(data.get("password")):
        session["user_id"] = u.id
        return jsonify({"message": "login ok", "user": u.to_dict()})
    return jsonify({"error": "invalid credentials"}), 401


@app.route("/api/users", methods=["GET"])
def list_users():
    return jsonify([u.to_dict() for u in User.query.all()])


@app.route("/api/users/<int:id>", methods=["PUT"])
def update_user(id):
    u = User.query.get_or_404(id)
    data = request.json
    if "username" in data:
        u.username = data["username"]
    if "password" in data:
        u.set_password(data["password"])
    db.session.commit()
    return jsonify(u.to_dict())


@app.route("/api/users/<int:id>", methods=["DELETE"])
def delete_user(id):
    u = User.query.get_or_404(id)
    db.session.delete(u)
    db.session.commit()
    return jsonify({"message": "user deleted"})


# ------------------- PRODUCTS -------------------
@app.route("/api/products", methods=["GET"])
def get_products():
    return jsonify([p.to_dict() for p in Product.query.all()])


@app.route("/api/products/<int:id>", methods=["GET"])
def get_product(id):
    return jsonify(Product.query.get_or_404(id).to_dict())


@app.route("/api/products", methods=["POST"])
def add_product():
    data = request.json
    if not data.get("name") or data.get("price") is None:
        return jsonify({"error": "name and price required"}), 400
    p = Product(
        name=data["name"],
        description=data.get("description", ""),
        price=float(data["price"]),
        stock=int(data.get("stock", 0)),
        image_url=data.get("image_url", "")
    )
    db.session.add(p)
    db.session.commit()
    return jsonify(p.to_dict()), 201


@app.route("/api/products/<int:id>", methods=["PUT"])
def update_product(id):
    p = Product.query.get_or_404(id)
    data = request.json
    for field in ["name", "description", "price", "stock", "image_url"]:
        if field in data:
            setattr(p, field, data[field])
    db.session.commit()
    return jsonify(p.to_dict())


@app.route("/api/products/<int:id>", methods=["DELETE"])
def delete_product(id):
    p = Product.query.get_or_404(id)
    db.session.delete(p)
    db.session.commit()
    return jsonify({"message": "deleted"})


# ------------------- CART -------------------
@app.route("/api/cart", methods=["GET"])
def view_cart():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "login required"}), 401
    items = CartItem.query.filter_by(user_id=user_id).all()
    return jsonify([i.to_dict() for i in items])


@app.route("/api/cart", methods=["POST"])
def add_cart():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "login required"}), 401
    data = request.json
    c = CartItem(user_id=user_id, product_id=data["product_id"], quantity=data.get("quantity", 1))
    db.session.add(c)
    db.session.commit()
    return jsonify(c.to_dict()), 201


@app.route("/api/cart/<int:id>", methods=["PUT"])
def update_cart(id):
    c = CartItem.query.get_or_404(id)
    data = request.json
    c.quantity = data.get("quantity", c.quantity)
    db.session.commit()
    return jsonify(c.to_dict())


@app.route("/api/cart/<int:id>", methods=["DELETE"])
def delete_cart(id):
    c = CartItem.query.get_or_404(id)
    db.session.delete(c)
    db.session.commit()
    return jsonify({"message": "removed"})


# ------------------- ORDERS -------------------
@app.route("/api/orders", methods=["GET"])
def list_orders():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "login required"}), 401
    return jsonify([o.to_dict() for o in Order.query.filter_by(user_id=user_id).all()])


@app.route("/api/orders", methods=["POST"])
def place_order():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "login required"}), 401
    o = Order(user_id=user_id, status="pending")
    db.session.add(o)
    CartItem.query.filter_by(user_id=user_id).delete()
    db.session.commit()
    return jsonify(o.to_dict()), 201


@app.route("/api/orders/<int:id>", methods=["PUT"])
def update_order(id):
    o = Order.query.get_or_404(id)
    data = request.json
    if "status" in data:
        o.status = data["status"]
    db.session.commit()
    return jsonify(o.to_dict())


@app.route("/api/orders/<int:id>", methods=["DELETE"])
def delete_order(id):
    o = Order.query.get_or_404(id)
    db.session.delete(o)
    db.session.commit()
    return jsonify({"message": "order deleted"})


# ------------------- CONTACTS -------------------
@app.route("/api/contacts", methods=["GET"])
def get_contacts():
    return jsonify([m.to_dict() for m in ContactMessage.query.all()])


@app.route("/api/contacts", methods=["POST"])
def add_contact():
    data = request.json
    c = ContactMessage(
        full_name=data["full_name"],
        email=data["email"],
        subject=data.get("subject", ""),
        message=data["message"],
    )
    db.session.add(c)
    db.session.commit()
    return jsonify(c.to_dict()), 201


@app.route("/api/contacts/<int:id>", methods=["PUT"])
def update_contact(id):
    c = ContactMessage.query.get_or_404(id)
    data = request.json
    for field in ["full_name", "email", "subject", "message"]:
        if field in data:
            setattr(c, field, data[field])
    db.session.commit()
    return jsonify(c.to_dict())


@app.route("/api/contacts/<int:id>", methods=["DELETE"])
def delete_contact(id):
    c = ContactMessage.query.get_or_404(id)
    db.session.delete(c)
    db.session.commit()
    return jsonify({"message": "contact deleted"})


# ------------------- MAIN -------------------
if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
