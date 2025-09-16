import React from 'react';
import { ShoppingBag, Users, Award, Truck } from 'lucide-react';

export function About() {
  const features = [
    {
      icon: <ShoppingBag className="w-12 h-12 text-orange-600" />,
      title: 'Quality Products',
      description: 'We curate only the finest electronics and gaming equipment from trusted brands worldwide.'
    },
    {
      icon: <Users className="w-12 h-12 text-orange-600" />,
      title: 'Customer First',
      description: 'Our dedicated support team is here to help you find exactly what you need, when you need it.'
    },
    {
      icon: <Award className="w-12 h-12 text-orange-600" />,
      title: 'Best Prices',
      description: 'Competitive pricing with regular sales and exclusive deals for our loyal customers.'
    },
    {
      icon: <Truck className="w-12 h-12 text-orange-600" />,
      title: 'Fast Shipping',
      description: 'Quick and reliable delivery options to get your products to you as fast as possible.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About QuickCart</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Your trusted destination for the latest in electronics, gaming, and technology. 
            We're passionate about bringing you the products that enhance your digital lifestyle.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Founded in 2020, QuickCart began as a passion project by tech enthusiasts who wanted to 
                create a better shopping experience for fellow gamers and technology lovers. We noticed 
                that finding quality products at fair prices was often frustrating and time-consuming.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Today, we've grown into a trusted platform serving thousands of customers worldwide, 
                but we've never forgotten our core mission: to make technology accessible, affordable, 
                and enjoyable for everyone.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Every product in our catalog is carefully selected for quality, performance, and value. 
                We work directly with manufacturers and authorized distributors to ensure authenticity 
                and competitive pricing.
              </p>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
                alt="Team working"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose QuickCart?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing an exceptional shopping experience with every order.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-200">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto">
              To democratize access to cutting-edge technology by providing a curated selection of 
              high-quality products at competitive prices, backed by exceptional customer service 
              and a seamless shopping experience.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">10K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">500+</div>
              <div className="text-gray-600">Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}