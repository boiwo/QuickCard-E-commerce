import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (user) {
      logout();
    } else {
      navigate('/login');
    }
  };

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-orange-600">QuickCart</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-orange-600 transition-colors duration-200">
              Home
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-orange-600 transition-colors duration-200">
              Shop
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-600 transition-colors duration-200">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-orange-600 transition-colors duration-200">
              Contact
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/shop" className="text-gray-600 hover:text-orange-600 transition-colors duration-200">
              <Search size={20} />
            </Link>
            <Link to="/cart" className="relative text-gray-600 hover:text-orange-600 transition-colors duration-200">
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <button
              onClick={handleAuthClick}
              className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors duration-200"
            >
              <User size={20} />
              <span className="text-sm">{user ? user.name : 'Account'}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 hover:text-orange-600 transition-colors duration-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-2">
            <Link
              to="/"
              className="block py-2 text-gray-700 hover:text-orange-600 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block py-2 text-gray-700 hover:text-orange-600 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="block py-2 text-gray-700 hover:text-orange-600 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-gray-700 hover:text-orange-600 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/cart"
              className="flex items-center py-2 text-gray-700 hover:text-orange-600 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingCart size={20} className="mr-2" />
              Cart ({cartItemsCount})
            </Link>
            <button
              onClick={() => {
                handleAuthClick();
                setIsMenuOpen(false);
              }}
              className="flex items-center py-2 text-gray-700 hover:text-orange-600 transition-colors duration-200"
            >
              <User size={20} className="mr-2" />
              {user ? user.name : 'Account'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}