import React, { useState } from 'react';

interface FarmIconProps {
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl'; // ✅ Removed xxl size
}

// ✅ REMOVED XXL SIZE - Only up to XL now
const sizeClasses = {
  sm: 'w-5 h-5',
  md: 'w-7 h-7',  
  lg: 'w-10 h-10',
  xl: 'w-14 h-14'  // Largest size is now xl
};

// Emoji fallbacks for your icon names
const emojiMap: { [key: string]: string } = {
  logo: '🌾',
  dashboard: '🏠',
  weather: '🌤️',
  crops: '🌾',
  'pest-detection': '🔍',
  market: '💰',
  community: '👥',
  marketplace: '🛒',
  farmer: '👨‍🌾',
  notifications: '🔔',
  sunny: '☀️',
  irrigation: '💧',
  'farm-area': '🏞️',
  harvest: '🌾',
  revenue: '💵',
  tractor: '🚜',
  plant: '🌱',
  livestock: '🐄',
  organic: '🍃'
};

const FarmIcon: React.FC<FarmIconProps> = ({ 
  name, 
  className = '', 
  size = 'lg'
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const imagePath = `/images/icons/${name}.png`;
  const sizeClass = sizeClasses[size];
  
  if (imageError) {
    return (
      <span className={`${sizeClass} flex items-center justify-center text-2xl ${className}`}>
        {emojiMap[name] || '🌾'}
      </span>
    );
  }
  
  return (
    <div className={`${sizeClass} relative ${className}`}>
      {!imageLoaded && (
        <span className={`${sizeClass} flex items-center justify-center absolute inset-0 text-gray-400 text-2xl`}>
          {emojiMap[name] || '🌾'}
        </span>
      )}
      
      <img
        src={imagePath}
        alt={name}
        className={`${sizeClass} object-contain transition-opacity duration-200 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => {
          setImageLoaded(true);
          console.log(`✅ Successfully loaded: ${imagePath}`);
        }}
        onError={(e) => {
          console.warn(`❌ Failed to load image: ${imagePath}`);
          setImageError(true);
        }}
        loading="lazy"
      />
    </div>
  );
};

export default FarmIcon;
