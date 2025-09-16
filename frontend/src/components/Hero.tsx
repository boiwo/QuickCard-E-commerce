import React from 'react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Level Up Your{' '}
              <span className="text-orange-500">Gaming Experience</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Discover the latest in gaming technology, premium audio equipment, and cutting-edge electronics. 
              Shop with confidence and get the best deals on top brands.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/shop"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200 text-center"
              >
                Shop Now
              </Link>
              <Link
                to="/about"
                className="border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-colors duration-200 text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg"
              alt="Gaming Setup"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}