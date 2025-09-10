import React from 'react';
import ProfessionalIcon from './ProfessionalIcon';

interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
  gradient?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  change,
  changeType,
  icon,
  gradient = 'ag-gradient-primary'
}) => {
  const getChangeColor = () => {
    switch(changeType) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="ag-card-elevated p-6 relative overflow-hidden group hover:scale-105 transition-transform duration-300">
      {/* Background Gradient Circle */}
      <div className={`absolute -top-6 -right-6 w-24 h-24 ${gradient} rounded-full opacity-10 group-hover:opacity-20 transition-opacity`}></div>
      
      {/* Icon */}
      <div className="mb-4 relative z-10">
        <div className={`w-12 h-12 ${gradient} rounded-lg flex items-center justify-center shadow-lg`}>
          <ProfessionalIcon name={icon} size="lg" className="text-white" />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
        <div className="flex items-end justify-between mb-2">
          <span className="text-3xl font-bold text-gray-800">{value}</span>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getChangeColor()}`}>
            {change}
          </span>
        </div>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>
      
      {/* Hover Effect */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  );
};

export default StatsCard;
