import React from 'react';
import ProfessionalIcon from './ProfessionalIcon';

const ProfessionalHeader: React.FC = () => {
  return (
    <div className="ag-gradient-primary text-white rounded-lg p-8 mb-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="farm-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#farm-pattern)" />
        </svg>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <ProfessionalIcon name="farmer" size="xl" className="bg-white/20 p-2 rounded-full" />
          <div>
            <h1 className="text-3xl font-bold mb-2">Good Morning, Farmer Singh! 🌅</h1>
            <p className="text-green-100 text-lg">Here's your farm overview for today</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold">
            {new Date().toLocaleDateString('en-IN', { 
              day: 'numeric',
              month: 'numeric', 
              year: 'numeric'
            })}
          </div>
          <div className="text-green-200 text-lg">Kharif Season</div>
          <div className="bg-white/20 px-4 py-2 rounded-full mt-2">
            <span className="text-sm font-medium">🌾 Prime Growing Season</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalHeader;
