import React from 'react';
import FarmIcon from '../../ui/FarmIcon';

// ✅ Define props interface
interface MarketPriceTrackerProps {
  location: {
    latitude: number;
    longitude: number;
    district: string;
    state: string;
    pincode: string;
  };
  selectedCrops: string[];
}

const MarketPriceTracker: React.FC<MarketPriceTrackerProps> = ({ location, selectedCrops }) => {
  const marketPrices = [
    {
      crop: 'Wheat',
      currentPrice: 2150,
      previousPrice: 2100,
      unit: 'per quintal',
      trend: 'up',
      change: '+2.4%'
    },
    {
      crop: 'Rice',
      currentPrice: 3800,
      previousPrice: 3900,
      unit: 'per quintal',
      trend: 'down',
      change: '-2.6%'
    },
    {
      crop: 'Corn',
      currentPrice: 1850,
      previousPrice: 1800,
      unit: 'per quintal',
      trend: 'up',
      change: '+2.8%'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <FarmIcon name="market" size="xl" className="mr-4 text-white" />
          Market Prices
        </h1>
        <p className="text-yellow-100 text-lg">
          Live crop prices and trends for {location.district}, {location.state}
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          Selected Crops: {selectedCrops.join(', ')}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketPrices.map((price, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-semibold text-gray-800">{price.crop}</h4>
                <span className={`text-sm px-2 py-1 rounded-full font-medium ${
                  price.trend === 'up' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {price.change}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-800">
                  ₹{price.currentPrice.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">{price.unit}</div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-gray-600">Previous:</span>
                  <span className="text-gray-800">₹{price.previousPrice.toLocaleString()}</span>
                  <span className={price.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {price.trend === 'up' ? '↗️' : '↘️'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Market Insights</h3>
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
              <p className="text-green-800 text-sm">
                <strong>Wheat:</strong> Prices rising due to strong export demand
              </p>
            </div>
            <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
              <p className="text-red-800 text-sm">
                <strong>Rice:</strong> Slight decline due to increased supply
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>Corn:</strong> Steady growth expected this month
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Best Selling Times</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Wheat</span>
              <span className="font-semibold text-green-600">Next 2 weeks</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Rice</span>
              <span className="font-semibold text-yellow-600">Wait 1 month</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Corn</span>
              <span className="font-semibold text-green-600">Sell now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPriceTracker;
