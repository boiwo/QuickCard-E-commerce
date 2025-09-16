import React from 'react';
import { Hero } from '../components/Hero';
import { ProductSlider } from '../components/ProductSlider';
import { products } from '../data/products';

export function Home() {
  const featuredProducts = products.filter(product => product.featured);

  return (
    <div>
      <Hero />
      <ProductSlider products={featuredProducts} title="Featured Products" />
      <ProductSlider products={products} title="Popular Products" />
      
      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Headphones', 'Laptops', 'Smartphones', 'Gaming'].map(category => (
              <div key={category} className="group cursor-pointer">
                <div className="bg-gray-100 rounded-xl p-8 text-center hover:bg-orange-50 transition-colors duration-200">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600">
                    {category}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}