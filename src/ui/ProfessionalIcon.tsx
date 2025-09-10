import React from 'react';

interface ProfessionalIconProps {
  name: string; // ✅ Accept any string
  size?: 'sm' | 'md' | 'lg' | 'xl'; // ✅ Size as string options
  className?: string;
  fallbackEmoji?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6', 
  lg: 'w-8 h-8',
  xl: 'w-12 h-12'
};

const ProfessionalIcon: React.FC<ProfessionalIconProps> = ({ 
  name, 
  size = 'md', 
  className = '', 
  fallbackEmoji = '🌾' 
}) => {
  const [imageError, setImageError] = React.useState(false);
  const imagePath = `/images/icons/${name}.png`;
  
  if (imageError) {
    return (
      <span className={`${sizeClasses[size]} flex items-center justify-center text-center ${className}`}>
        {fallbackEmoji}
      </span>
    );
  }
  
  return (
    <img
      src={imagePath}
      alt={name}
      className={`${sizeClasses[size]} object-contain ${className}`}
      onError={() => setImageError(true)}
      loading="lazy"
    />
  );
};

export default ProfessionalIcon;
