import React from 'react';

// ✅ Define props interface
interface WeatherDashboardProps {
  location: {
    latitude: number;
    longitude: number;
    district: string;
    state: string;
    pincode: string;
  };
}

const WeatherDashboard: React.FC<WeatherDashboardProps> = ({ location }) => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">Weather Forecast</h1>
        <p className="text-blue-100 text-lg">
          Current conditions for {location.district}, {location.state}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="font-semibold text-gray-800 mb-4">Today</h3>
          <div className="text-3xl font-bold text-blue-600 mb-2">28°C</div>
          <p className="text-gray-600">Sunny</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="font-semibold text-gray-800 mb-4">Tomorrow</h3>
          <div className="text-3xl font-bold text-blue-600 mb-2">26°C</div>
          <p className="text-gray-600">Partly Cloudy</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="font-semibold text-gray-800 mb-4">Day After</h3>
          <div className="text-3xl font-bold text-blue-600 mb-2">30°C</div>
          <p className="text-gray-600">Clear</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Weather Alerts for {location.district}
        </h3>
        <div className="space-y-3">
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <div className="flex items-center">
              <span className="text-yellow-600 mr-2">⚠️</span>
              <span className="font-medium text-yellow-800">
                High Temperature Alert - 35°C expected tomorrow
              </span>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <div className="flex items-center">
              <span className="text-green-600 mr-2">✅</span>
              <span className="font-medium text-green-800">
                Ideal conditions for irrigation in the evening
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
