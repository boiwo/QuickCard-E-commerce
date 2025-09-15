import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { BrandLogo } from '../components/BrandLogo';

export function Cart() {
  const { items, updateQuantity, removeFromCart, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShoppingBag size={80} className="mx-auto text-gray-400 mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link
            to="/shop"
            className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors duration-200 inline-block font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6">
            {items.map((item) => (
              <div key={item.product.id} className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 py-6 border-b border-gray-200 last:border-b-0">
                <div className="relative">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="absolute -top-2 -right-2">
                    <BrandLogo brand={item.product.brand} size="sm" />
                  </div>
                </div>
                
                <div className="flex-1 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">{item.product.name}</h3>
                  <p className="text-gray-600">Brand: {item.product.brand}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Category:</span>
                    <span className="text-sm font-medium text-gray-700">{item.product.category}</span>
                  </div>
                  <p className="text-lg font-bold text-orange-600">
                    ${item.product.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-2 min-w-[60px] text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div>
                <p className="text-sm text-gray-600">
                  {items.reduce((total, item) => total + item.quantity, 0)} items in cart
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-sm text-gray-500">Brands:</span>
                  <div className="flex space-x-1">
                    {[...new Set(items.map(item => item.product.brand))].map(brand => (
                      <BrandLogo key={brand} brand={brand} size="sm" />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">
                  Total: ${total.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">Shipping calculated at checkout</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link
                to="/shop"
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors duration-200 text-center font-medium"
              >
                Continue Shopping
              </Link>
              <Link
                to="/checkout"
                className="flex-1 bg-orange-600 text-white py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors duration-200 text-center font-medium"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}