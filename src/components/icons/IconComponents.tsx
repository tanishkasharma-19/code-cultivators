import React from 'react';

// You can replace these with your actual Canva images
const iconPaths = {
  tractor: '/images/icons/tractor.png',
  farmer: '/images/icons/farmer.png',
  plant: '/images/icons/plant.png',
  livestock: '/images/icons/livestock.png',
  harvest: '/images/icons/harvest.png',
  organic: '/images/icons/organic.png',
  irrigation: '/images/icons/irrigation.png'
};

interface IconProps {
  name: keyof typeof iconPaths;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const IconComponent: React.FC<IconProps> = ({ name, size = 64, className = '', onClick }) => {
  return (
    <div 
      className={`inline-block ${onClick ? 'cursor-pointer hover:scale-110 transition-transform' : ''} ${className}`}
      onClick={onClick}
    >
      <img 
        src={iconPaths[name]} 
        alt={name}
        width={size}
        height={size}
        className="object-contain"
        onError={(e) => {
          // Fallback to emoji if image fails to load
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextSibling!.textContent = getEmojiForIcon(name);
        }}
      />
      <span className="hidden text-4xl">{getEmojiForIcon(name)}</span>
    </div>
  );
};

// Fallback emojis while you add your Canva images
const getEmojiForIcon = (iconName: string): string => {
  const emojiMap: {[key: string]: string} = {
    tractor: '🚜',
    farmer: '👨‍🌾',
    plant: '🌱',
    livestock: '🐄',
    harvest: '🌾',
    organic: '🍃',
    irrigation: '💧'
  };
  return emojiMap[iconName] || '🌾';
};

export default IconComponent;
