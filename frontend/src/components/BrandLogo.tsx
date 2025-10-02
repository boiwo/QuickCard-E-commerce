import React from 'react';

interface BrandLogoProps {
  brand?: string; // optional to avoid undefined error
  size?: 'sm' | 'md' | 'lg';
}

export function BrandLogo({ brand = 'Unknown', size = 'sm' }: BrandLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const getBrandLogo = (brandName: string) => {
    const name = brandName.toLowerCase(); // safe because default is 'Unknown'

    switch (name) {
      case 'apple':
        return (
          <div className={`${sizeClasses[size]} bg-gray-900 rounded-lg flex items-center justify-center`}>
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
          </div>
        );
      case 'samsung':
        return (
          <div className={`${sizeClasses[size]} bg-blue-600 rounded-lg flex items-center justify-center`}>
            <span className="text-white font-bold text-xs">SAMSUNG</span>
          </div>
        );
      case 'sony':
        return (
          <div className={`${sizeClasses[size]} bg-black rounded-lg flex items-center justify-center`}>
            <span className="text-white font-bold text-xs">SONY</span>
          </div>
        );
      case 'nintendo':
        return (
          <div className={`${sizeClasses[size]} bg-red-600 rounded-lg flex items-center justify-center`}>
            <span className="text-white font-bold text-xs">Nintendo</span>
          </div>
        );
      default:
        return (
          <div className={`${sizeClasses[size]} bg-gray-500 rounded-lg flex items-center justify-center`}>
            <span className="text-white font-bold text-xs">{brandName.charAt(0)}</span>
          </div>
        );
    }
  };

  return getBrandLogo(brand);
}
