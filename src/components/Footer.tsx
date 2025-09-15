import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Facebook, Twitter, Instagram, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-orange-500">QuickCart</div>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Your trusted destination for the latest in electronics, gaming, and technology. 
              Quality products at competitive prices.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
              >
                <Instagram size={20} />
              </a>
              <a
                href="mailto:support@quickcart.com"
                className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-400 hover:text-orange-500 transition-colors duration-200">
                Home
              </Link>
              <Link to="/shop" className="block text-gray-400 hover:text-orange-500 transition-colors duration-200">
                Shop
              </Link>
              <Link to="/about" className="block text-gray-400 hover:text-orange-500 transition-colors duration-200">
                About Us
              </Link>
              <Link to="/contact" className="block text-gray-400 hover:text-orange-500 transition-colors duration-200">
                Contact
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Categories</h3>
            <div className="space-y-2">
              <Link to="/shop" className="block text-gray-400 hover:text-orange-500 transition-colors duration-200">
                Headphones
              </Link>
              <Link to="/shop" className="block text-gray-400 hover:text-orange-500 transition-colors duration-200">
                Laptops
              </Link>
              <Link to="/shop" className="block text-gray-400 hover:text-orange-500 transition-colors duration-200">
                Smartphones
              </Link>
              <Link to="/shop" className="block text-gray-400 hover:text-orange-500 transition-colors duration-200">
                Gaming
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-orange-500" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-orange-500" />
                <span className="text-gray-400">support@quickcart.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-orange-500 mt-1" />
                <span className="text-gray-400">123 Commerce St<br />Tech City, TC 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 QuickCart. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-orange-500 text-sm transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-orange-500 text-sm transition-colors duration-200">
              Terms of Service
            </Link>
            <Link to="/support" className="text-gray-400 hover:text-orange-500 text-sm transition-colors duration-200">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}