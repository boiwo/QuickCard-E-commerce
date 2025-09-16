import { Product } from '../types/Product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Apple AirPods Pro 2nd Gen',
    price: 399.99,
    originalPrice: 499.99,
    image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg',
    images: [
      'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg',
      'https://images.pexels.com/photos/4195504/pexels-photo-4195504.jpeg',
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg'
    ],
    category: 'Earphones',
    brand: 'Apple',
    color: 'White',
    description: 'Apple AirPods Pro (2nd Gen) with MagSafe Case (USB-C) provide excellent sound, active noise cancellation, and a comfortable fit. The USB-C case ensures quick charging, and they pair seamlessly with Apple devices for an effortless audio experience.',
    rating: 4.5,
    reviews: 1248,
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: 'Sony WH-1000XM4 Wireless Headphones',
    price: 299.99,
    originalPrice: 349.99,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
      'https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg'
    ],
    category: 'Headphones',
    brand: 'Sony',
    color: 'Black',
    description: 'Experience crystal-clear audio with premium noise-canceling headphones. Perfect for travel, work, and entertainment.',
    rating: 4.8,
    reviews: 2156,
    inStock: true,
    featured: true
  },
  {
    id: '3',
    name: 'MacBook Pro 14-inch',
    price: 1999.99,
    image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg',
    images: [
      'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg',
      'https://images.pexels.com/photos/18105/pexels-photo.jpg'
    ],
    category: 'Laptops',
    brand: 'Apple',
    color: 'Space Gray',
    description: 'Shop the latest laptops for work, gaming, and more. Power in every pixel with cutting-edge performance.',
    rating: 4.9,
    reviews: 892,
    inStock: true,
    featured: true
  },
  {
    id: '4',
    name: 'Samsung Galaxy S24 Ultra',
    price: 1199.99,
    image: 'https://images.pexels.com/photos/1038628/pexels-photo-1038628.jpeg',
    images: [
      'https://images.pexels.com/photos/1038628/pexels-photo-1038628.jpeg',
      'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg'
    ],
    category: 'Smartphones',
    brand: 'Samsung',
    color: 'Phantom Black',
    description: 'The ultimate smartphone experience with advanced camera system and premium features.',
    rating: 4.7,
    reviews: 1567,
    inStock: true
  },
  {
    id: '5',
    name: 'iPad Pro 12.9-inch',
    price: 1099.99,
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg',
    images: [
      'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg'
    ],
    category: 'Tablets',
    brand: 'Apple',
    color: 'Silver',
    description: 'Professional tablet for creative work and productivity.',
    rating: 4.6,
    reviews: 743,
    inStock: true
  },
  {
    id: '6',
    name: 'Nintendo Switch OLED',
    price: 349.99,
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
    images: [
      'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg'
    ],
    category: 'Gaming',
    brand: 'Nintendo',
    color: 'Neon Blue/Red',
    description: 'Portable gaming console with vibrant OLED display.',
    rating: 4.4,
    reviews: 1823,
    inStock: true
  }
];