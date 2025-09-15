from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Product, Order

app = Flask(__name__)

# ---------- CONFIG ----------
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///quickcart.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'supersecretkey'

db.init_app(app)
jwt = JWTManager(app)

# ---------- USER ROUTES ----------
@app.route('/api/users/register', methods=['POST'])
def register():
    data = request.json
    if not data or not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Missing required fields"}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already registered"}), 400

    hashed_pw = generate_password_hash(data['password'])
    new_user = User(username=data['username'], email=data['email'], password=hashed_pw)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully!"}), 201

@app.route('/api/users/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password, data['password']):
        token = create_access_token(identity=user.id)
        return jsonify({"token": token})
    return jsonify({"error": "Invalid credentials"}), 401

# ---------- PRODUCT ROUTES ----------
@app.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{
        "id": p.id,
        "name": p.name,
        "description": p.description,
        "price": p.price,
        "image": p.image
    } for p in products])

@app.route('/api/products/<int:id>', methods=['GET'])
def get_product(id):
    p = Product.query.get_or_404(id)
    return jsonify({
        "id": p.id,
        "name": p.name,
        "description": p.description,
        "price": p.price,
        "image": p.image
    })

@app.route('/api/products', methods=['POST'])
@jwt_required()
def add_product():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user.is_admin:
        return jsonify({"error": "Admins only"}), 403
    data = request.json
    new_product = Product(**data)
    db.session.add(new_product)
    db.session.commit()
    return jsonify({"message": "Product added!"}), 201

@app.route('/api/products/<int:id>', methods=['PUT'])
@jwt_required()
def update_product(id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user.is_admin:
        return jsonify({"error": "Admins only"}), 403
    data = request.json
    product = Product.query.get_or_404(id)
    product.name = data.get('name', product.name)
    product.description = data.get('description', product.description)
    product.price = data.get('price', product.price)
    product.image = data.get('image', product.image)
    db.session.commit()
    return jsonify({"message": "Product updated!"})

@app.route('/api/products/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_product(id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user.is_admin:
        return jsonify({"error": "Admins only"}), 403
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted!"})

# ---------- ORDER ROUTES ----------
@app.route('/api/orders', methods=['POST'])
@jwt_required()
def create_order():
    user_id = get_jwt_identity()
    data = request.json
    if not data or not data.get('total'):
        return jsonify({"error": "Missing order total"}), 400
    new_order = Order(user_id=user_id, total=data['total'])
    db.session.add(new_order)
    db.session.commit()
    return jsonify({"message": "Order placed!"}), 201

@app.route('/api/orders', methods=['GET'])
@jwt_required()
def get_orders():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user.is_admin:
        orders = Order.query.all()
    else:
        orders = Order.query.filter_by(user_id=user_id).all()
    return jsonify([{
        "id": o.id,
        "user_id": o.user_id,
        "status": o.status,
        "total": o.total,
        "created_at": o.created_at
    } for o in orders])

@app.route('/api/orders/<int:id>', methods=['PUT'])
@jwt_required()
def update_order(id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user.is_admin:
        return jsonify({"error": "Admins only"}), 403
    order = Order.query.get_or_404(id)
    order.status = request.json.get('status', order.status)
    db.session.commit()
    return jsonify({"message": "Order updated!"})

@app.route('/api/orders/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_order(id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user.is_admin:
        return jsonify({"error": "Admins only"}), 403
    order = Order.query.get_or_404(id)
    db.session.delete(order)
    db.session.commit()
    return jsonify({"message": "Order deleted!"})

# ---------- HOME & HEALTH ROUTES ----------
@app.route('/')
def home():
    return jsonify({"message": "QuickCart API is running 🚀"})

@app.route('/api/health')
def health():
    return jsonify({"status": "OK"})

# ---------- MAIN ----------
if __name__ == '__main__':
    app.run(debug=True)
