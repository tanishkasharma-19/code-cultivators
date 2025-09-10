import React, { useState } from 'react';
import Modal from '../../ui/Modal';
import FarmIcon from '../../ui/FarmIcon';

const SmartFarmDashboard: React.FC = () => {
  const [selectedModal, setSelectedModal] = useState<string | null>(null);
  const [selectedStat, setSelectedStat] = useState<any>(null);

  const statsData = [
    {
      id: 'farm-area',
      title: 'Farm Area',
      value: '25 acres',
      subtitle: 'Total cultivated land',
      change: '+2%',
      changeType: 'positive' as const,
      icon: 'farm-area',
      details: {
        totalArea: '25 acres',
        cultivatedArea: '22 acres',
        fallowArea: '3 acres',
        soilType: 'Alluvial',
        irrigationType: 'Drip + Sprinkler',
        recentExpansion: '2 acres added this year'
      }
    },
    {
      id: 'crops',
      title: 'Active Crops',
      value: '8 varieties',
      subtitle: 'Currently growing',
      change: '+1',
      changeType: 'positive' as const,
      icon: 'crops',
      details: {
        kharifCrops: ['Rice', 'Cotton', 'Sugarcane', 'Corn'],
        rabiCrops: ['Wheat', 'Barley', 'Peas'],
        perennialCrops: ['Mango Trees'],
        totalVarieties: 8,
        newThisSeason: 'Quinoa (trial crop)'
      }
    },
    {
      id: 'harvest',
      title: 'Expected Yield',
      value: '120 tons',
      subtitle: 'This harvest season',
      change: '+15%',
      changeType: 'positive' as const,
      icon: 'harvest',
      details: {
        wheat: '45 tons',
        rice: '35 tons',
        cotton: '25 tons',
        vegetables: '15 tons',
        totalValue: '₹18,00,000',
        harvestPeriod: 'March - May 2025'
      }
    },
    {
      id: 'revenue',
      title: 'Revenue Projection',
      value: '₹8.5L',
      subtitle: 'Estimated income',
      change: '+18%',
      changeType: 'positive' as const,
      icon: 'revenue',
      details: {
        cropSales: '₹6,50,000',
        governmentSubsidy: '₹1,20,000',
        organicPremium: '₹80,000',
        totalExpected: '₹8,50,000',
        profitMargin: '35%',
        lastYear: '₹7,20,000'
      }
    }
  ];

  const quickActions = [
    {
      id: 'irrigation',
      title: 'Schedule Irrigation',
      description: 'Manage water schedules for your crops',
      icon: 'irrigation',
      color: 'blue',
      action: () => setSelectedModal('irrigation')
    },
    {
      id: 'pest-detection',
      title: 'Detect Pest',
      description: 'AI-powered pest identification',
      icon: 'pest-detection',
      color: 'green',
      action: () => setSelectedModal('pest-detection')
    },
    {
      id: 'market',
      title: 'Check Prices',
      description: 'Live market prices and trends',
      icon: 'market',
      color: 'yellow',
      action: () => setSelectedModal('market-prices')
    }
  ];

  const handleStatClick = (stat: any) => {
    setSelectedStat(stat);
    setSelectedModal('stat-details');
  };

  const closeModal = () => {
    setSelectedModal(null);
    setSelectedStat(null);
  };

  return (
    <div className="space-y-8">
      {/* Professional Header */}
      <div 
        className="text-white p-8 rounded-lg relative overflow-hidden shadow-2xl cursor-pointer hover:shadow-3xl transition-shadow"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(34, 197, 94, 0.9), rgba(22, 163, 74, 0.95)), url('/images/farm/hero-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        onClick={() => setSelectedModal('farm-overview')}
      >
        <div className="absolute inset-0 opacity-10">
          <img 
            src="/images/ui/pattern.png"
            alt="pattern"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
              <FarmIcon name="farmer" size="xl" className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Good Morning, Farmer Singh! 🌅</h1>
              <p className="text-green-100 text-xl">Click to view detailed farm overview</p>
            </div>
          </div>
          
          <div className="text-right bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
            <div className="text-3xl font-bold mb-2">
              {new Date().toLocaleDateString('en-IN', { 
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </div>
            <div className="text-green-200 text-lg mb-2">Kharif Season</div>
            <div className="bg-green-500/30 px-4 py-2 rounded-full">
              <span className="text-sm font-medium flex items-center">
                <FarmIcon name="plant" size="sm" className="mr-2" />
                Prime Growing Season
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ CLICKABLE Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 relative overflow-hidden group border border-gray-100 cursor-pointer transform hover:scale-105"
            onClick={() => handleStatClick(stat)}
          >
            {/* Background Image */}
            <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
              <img 
                src="/images/farm/field-1.png"
                alt="farm background" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
            
            {/* Icon */}
            <div className="mb-6 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <FarmIcon name={stat.icon} size="lg" className="text-white" />
              </div>
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-gray-600 text-sm font-medium mb-2 uppercase tracking-wide">{stat.title}</h3>
              <div className="flex items-end justify-between mb-3">
                <span className="text-3xl font-bold text-gray-800">{stat.value}</span>
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  stat.changeType === 'positive' ? 'text-green-700 bg-green-100 border border-green-200' : 'text-gray-600 bg-gray-100'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-500 text-sm font-medium">{stat.subtitle}</p>
              <p className="text-xs text-blue-600 mt-2 font-medium">Click for details →</p>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </div>
        ))}
      </div>

      {/* ✅ CLICKABLE Professional Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weather Summary Card */}
        <div 
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 relative overflow-hidden border border-gray-100 cursor-pointer"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.98)), url('/images/farm/field-2.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          onClick={() => setSelectedModal('weather-details')}
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <FarmIcon name="weather" size="lg" className="mr-3 text-blue-600" />
                Today's Weather
              </h3>
              <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-200">
                <FarmIcon name="sunny" size="lg" className="text-yellow-500" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-white/50 p-3 rounded-lg backdrop-blur-sm">
                <span className="text-gray-700 font-medium">Temperature</span>
                <span className="font-bold text-blue-600 text-lg">28°C</span>
              </div>
              <div className="flex justify-between items-center bg-white/50 p-3 rounded-lg backdrop-blur-sm">
                <span className="text-gray-700 font-medium">Humidity</span>
                <span className="font-bold text-blue-600 text-lg">65%</span>
              </div>
              <div className="flex justify-between items-center bg-white/50 p-3 rounded-lg backdrop-blur-sm">
                <span className="text-gray-700 font-medium">Wind Speed</span>
                <span className="font-bold text-blue-600 text-lg">12 km/h</span>
              </div>
            </div>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors w-full mt-6 font-semibold shadow-lg">
              View Detailed Forecast
            </button>
          </div>
        </div>

        {/* ✅ CLICKABLE Quick Actions Card */}
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100">
          <div className="flex items-center mb-6">
            <FarmIcon name="tractor" size="lg" className="mr-3 text-green-600" />
            <h3 className="text-xl font-bold text-gray-800">Quick Actions</h3>
          </div>
          <div className="space-y-4">
            {quickActions.map((action) => (
              <button 
                key={action.id}
                onClick={action.action}
                className={`w-full flex items-center justify-between p-4 bg-gradient-to-r from-${action.color}-50 to-${action.color}-100 hover:from-${action.color}-100 hover:to-${action.color}-200 rounded-xl transition-all duration-200 border border-${action.color}-200 group`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`bg-${action.color}-500 p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                    <FarmIcon name={action.icon} size="md" className="text-white" />
                  </div>
                  <div className="text-left">
                    <span className={`font-semibold text-${action.color}-800 block`}>{action.title}</span>
                    <span className={`text-xs text-${action.color}-600`}>{action.description}</span>
                  </div>
                </div>
                <span className={`text-${action.color}-600 text-xl`}>→</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ MODALS */}
      
      {/* Stat Details Modal */}
      <Modal 
        isOpen={selectedModal === 'stat-details'} 
        onClose={closeModal}
        title={selectedStat?.title || ''}
        size="lg"
      >
        {selectedStat && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                <FarmIcon name={selectedStat.icon} size="lg" className="text-white" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-gray-800">{selectedStat.value}</h4>
                <p className="text-gray-600">{selectedStat.subtitle}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {Object.entries(selectedStat.details).map(([key, value]) => (
  <div key={key} className="bg-gray-50 p-4 rounded-lg">
    <div className="text-sm text-gray-600 font-medium capitalize">
      {key.replace(/([A-Z])/g, ' $1')}
    </div>
    <div className="text-lg font-semibold text-gray-800 mt-1">
      {Array.isArray(value) ? value.join(', ') : String(value)} {/* ✅ Fixed with String() */}
    </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* Farm Overview Modal */}
      <Modal 
        isOpen={selectedModal === 'farm-overview'} 
        onClose={closeModal}
        title="Complete Farm Overview"
        size="xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-green-50 p-6 rounded-lg">
            <h4 className="text-lg font-bold text-green-800 mb-4">Farm Statistics</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total Area:</span>
                <span className="font-semibold">25 acres</span>
              </div>
              <div className="flex justify-between">
                <span>Active Crops:</span>
                <span className="font-semibold">8 varieties</span>
              </div>
              <div className="flex justify-between">
                <span>Irrigation Coverage:</span>
                <span className="font-semibold">88%</span>
              </div>
              <div className="flex justify-between">
                <span>Soil Health Score:</span>
                <span className="font-semibold text-green-600">Excellent (9.2/10)</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="text-lg font-bold text-blue-800 mb-4">Current Season</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Season:</span>
                <span className="font-semibold">Kharif 2025</span>
              </div>
              <div className="flex justify-between">
                <span>Progress:</span>
                <span className="font-semibold">75% Complete</span>
              </div>
              <div className="flex justify-between">
                <span>Expected Harvest:</span>
                <span className="font-semibold">March 2025</span>
              </div>
              <div className="flex justify-between">
                <span>Weather Conditions:</span>
                <span className="font-semibold text-green-600">Favorable</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Weather Details Modal */}
      <Modal 
        isOpen={selectedModal === 'weather-details'} 
        onClose={closeModal}
        title="7-Day Weather Forecast"
        size="lg"
      >
        <div className="space-y-4">
          {[
            { day: 'Today', temp: '28°C', condition: 'Sunny', humidity: '65%', rain: '0%' },
            { day: 'Tomorrow', temp: '26°C', condition: 'Partly Cloudy', humidity: '70%', rain: '10%' },
            { day: 'Day 3', temp: '30°C', condition: 'Clear', humidity: '60%', rain: '0%' },
            { day: 'Day 4', temp: '32°C', condition: 'Hot', humidity: '55%', rain: '5%' },
            { day: 'Day 5', temp: '29°C', condition: 'Cloudy', humidity: '75%', rain: '20%' },
            { day: 'Day 6', temp: '27°C', condition: 'Light Rain', humidity: '80%', rain: '60%' },
            { day: 'Day 7', temp: '25°C', condition: 'Rainy', humidity: '85%', rain: '80%' }
          ].map((weather, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <FarmIcon name="weather" size="md" className="text-white" />
                </div>
                <div>
                  <div className="font-semibold">{weather.day}</div>
                  <div className="text-sm text-gray-600">{weather.condition}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">{weather.temp}</div>
                <div className="text-sm text-gray-600">Rain: {weather.rain}</div>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Irrigation Modal */}
      <Modal 
        isOpen={selectedModal === 'irrigation'} 
        onClose={closeModal}
        title="Irrigation Management"
        size="lg"
      >
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="text-lg font-bold text-blue-800 mb-4">Schedule New Irrigation</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Field</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg">
                  <option>Field A - Wheat (10 acres)</option>
                  <option>Field B - Rice (8 acres)</option>
                  <option>Field C - Cotton (7 acres)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (hours)</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg">
                  <option>2 hours</option>
                  <option>4 hours</option>
                  <option>6 hours</option>
                </select>
              </div>
            </div>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors mt-4">
              Schedule Irrigation
            </button>
          </div>
        </div>
      </Modal>

      {/* Market Prices Modal */}
      <Modal 
        isOpen={selectedModal === 'market-prices'} 
        onClose={closeModal}
        title="Live Market Prices"
        size="lg"
      >
        <div className="space-y-4">
          {[
            { crop: 'Wheat', price: '₹2,150', change: '+2.4%', trend: 'up' },
            { crop: 'Rice', price: '₹3,800', change: '-2.6%', trend: 'down' },
            { crop: 'Cotton', price: '₹5,200', change: '+5.1%', trend: 'up' },
            { crop: 'Corn', price: '₹1,850', change: '+2.8%', trend: 'up' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <FarmIcon name="crops" size="md" className="text-green-600" />
                <div>
                  <div className="font-semibold">{item.crop}</div>
                  <div className="text-sm text-gray-600">per quintal</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">{item.price}</div>
                <div className={`text-sm font-medium ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {item.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Enhanced Pest Detection Modal with File Upload */}
<Modal 
  isOpen={selectedModal === 'pest-detection'} 
  onClose={closeModal}
  title="AI Pest Detection"
  size="lg"
>
  <div className="space-y-6">
    <div className="text-center">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <FarmIcon name="pest-detection" size="xl" className="text-green-600" />
      </div>
      <h4 className="text-xl font-bold text-gray-800 mb-2">Upload Plant Image</h4>
      <p className="text-gray-600">Take a clear photo of affected leaves, stems, or the pest itself</p>
    </div>

    {/* Upload Area */}
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-400 transition-colors">
      <div className="text-center space-y-4">
        <FarmIcon name="pest-detection" size="lg" className="mx-auto text-gray-400" />
        
        {/* Working Buttons */}
        <div className="flex justify-center space-x-4">
          <label className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium cursor-pointer">
            📁 Choose File
            <input 
              type="file" 
              className="hidden" 
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  alert(`File selected: ${file.name}`);
                  // Here you would handle the file upload
                  console.log('File selected:', file);
                }
              }}
            />
          </label>
          
          <button 
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
            onClick={() => {
              // Handle camera capture
              if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true })
                  .then(() => {
                    alert('Camera access granted! Photo capture functionality would be implemented here.');
                  })
                  .catch(() => {
                    alert('Camera access denied or not available');
                  });
              } else {
                alert('Camera not supported on this device');
              }
            }}
          >
            📸 Take Photo
          </button>
        </div>
        
        <p className="text-xs text-gray-400">
          Supported formats: JPG, PNG, HEIC (Max size: 5MB)
        </p>
      </div>
    </div>

    {/* Sample Pest Images */}
    <div className="mt-6">
      <h5 className="text-lg font-semibold text-gray-800 mb-4">Common Pest Examples</h5>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { name: 'Aphids', image: '/images/pests/aphids.png', severity: 'Medium' },
          { name: 'Caterpillar', image: '/images/pests/caterpillar.png', severity: 'High' },
          { name: 'Sample 1', image: '/images/pests/pest-sample-1.png', severity: 'Low' },
          { name: 'Sample 2', image: '/images/pests/pest-sample-2.png', severity: 'Medium' }
        ].map((pest, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer">
            <img
              src={pest.image}
              alt={pest.name}
              className="w-full h-20 object-cover rounded-lg mb-2"
            />
            <h6 className="font-semibold text-sm text-gray-800">{pest.name}</h6>
            <p className="text-xs text-gray-600">Severity: {pest.severity}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</Modal>

    </div>
  );
};

export default SmartFarmDashboard;
