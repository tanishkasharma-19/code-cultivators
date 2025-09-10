import React, { useState } from 'react';
import FarmIcon from '../../ui/FarmIcon';
import Modal from '../../ui/Modal';

interface CropRecommendationProps {
  location: {
    latitude: number;
    longitude: number;
    district: string;
    state: string;
    pincode: string;
  };
  season: string;
}

const CropRecommendation: React.FC<CropRecommendationProps> = ({ location, season }) => {
  const [selectedCrop, setSelectedCrop] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const crops = [
    {
      name: 'Wheat',
      image: '/images/crops/wheat.png',
      suitability: 95,
      season: 'Rabi',
      waterNeed: 'Medium',
      details: {
        soilType: 'Loamy, well-drained',
        temperature: '15-20°C',
        rainfall: '75-100cm',
        sowingTime: 'November-December',
        harvestTime: 'April-May',
        yield: '40-45 quintals per hectare',
        marketPrice: '₹2,150 per quintal',
        profitability: 'High',
        diseases: 'Rust, Smut, Bunt',
        fertilizer: 'NPK 120:60:40 kg/ha'
      }
    },
    {
      name: 'Rice',
      image: '/images/crops/rice.png',
      suitability: 88,
      season: 'Kharif',
      waterNeed: 'High',
      details: {
        soilType: 'Clay, Clay loam',
        temperature: '21-37°C',
        rainfall: '150-200cm',
        sowingTime: 'June-July',
        harvestTime: 'November-December',
        yield: '50-60 quintals per hectare',
        marketPrice: '₹3,800 per quintal',
        profitability: 'Very High',
        diseases: 'Blast, Blight, Brown spot',
        fertilizer: 'NPK 100:50:50 kg/ha'
      }
    },
    {
      name: 'Corn',
      image: '/images/crops/corn.png',
      suitability: 92,
      season: 'Kharif',
      waterNeed: 'Medium',
      details: {
        soilType: 'Well-drained loamy',
        temperature: '21-27°C',
        rainfall: '50-75cm',
        sowingTime: 'June-July',
        harvestTime: 'September-October',
        yield: '35-40 quintals per hectare',
        marketPrice: '₹1,850 per quintal',
        profitability: 'High',
        diseases: 'Borer, Wilt, Leaf spot',
        fertilizer: 'NPK 120:60:40 kg/ha'
      }
    },
    {
      name: 'Cotton',
      image: '/images/crops/cotton.png',
      suitability: 85,
      season: 'Kharif',
      waterNeed: 'High',
      details: {
        soilType: 'Black cotton soil',
        temperature: '21-30°C',
        rainfall: '50-100cm',
        sowingTime: 'April-June',
        harvestTime: 'October-February',
        yield: '15-20 quintals per hectare',
        marketPrice: '₹5,200 per quintal',
        profitability: 'Very High',
        diseases: 'Bollworm, Aphids, Whitefly',
        fertilizer: 'NPK 80:40:40 kg/ha'
      }
    },
    {
      name: 'Sugarcane',
      image: '/images/crops/sugarcane.png',
      suitability: 78,
      season: 'Annual',
      waterNeed: 'Very High',
      details: {
        soilType: 'Rich loamy soil',
        temperature: '26-32°C',
        rainfall: '75-150cm',
        sowingTime: 'February-April',
        harvestTime: 'December-April',
        yield: '800-1000 quintals per hectare',
        marketPrice: '₹350 per quintal',
        profitability: 'High',
        diseases: 'Red rot, Smut, Wilt',
        fertilizer: 'NPK 280:90:90 kg/ha'
      }
    },
    {
      name: 'Vegetables',
      image: '/images/crops/vegetables.png',
      suitability: 90,
      season: 'Both',
      waterNeed: 'Medium',
      details: {
        soilType: 'Well-drained fertile',
        temperature: '15-25°C',
        rainfall: '25-75cm',
        sowingTime: 'Year-round',
        harvestTime: '60-120 days',
        yield: '200-400 quintals per hectare',
        marketPrice: '₹15-50 per kg',
        profitability: 'Very High',
        diseases: 'Fungal, Bacterial, Viral',
        fertilizer: 'Organic compost preferred'
      }
    }
  ];

  const handleViewDetails = (crop: any) => {
    setSelectedCrop(crop);
    setShowDetailsModal(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div 
        className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-lg relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(34, 197, 94, 0.9), rgba(22, 163, 74, 0.95)), url('/images/farm/farming-activities.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <FarmIcon name="crops" size="xl" className="mr-4 text-white" />
            Crop Recommendations for {season} Season
          </h1>
          <p className="text-green-100 text-lg">
            Based on soil, climate, and market conditions in {location.district}, {location.state}
          </p>
        </div>
      </div>

      {/* Crop Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {crops.map((crop, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
            {/* Crop Image */}
            <div className="h-48 relative overflow-hidden">
              <img
                src={crop.image}
                alt={crop.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full">
                <span className="text-green-600 font-semibold text-sm">{crop.suitability}% Match</span>
              </div>
            </div>
            
            {/* Crop Details */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{crop.name}</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Season:</span>
                  <span className="font-semibold text-blue-600">{crop.season}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Water Need:</span>
                  <span className="font-semibold text-blue-600">{crop.waterNeed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Suitability:</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{width: `${crop.suitability}%`}}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* ✅ WORKING VIEW DETAILS BUTTON */}
              <button 
                className="w-full mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors font-semibold"
                onClick={() => handleViewDetails(crop)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

     {/* ✅ CROP DETAILS MODAL - BUTTONS REMOVED */}
<Modal 
  isOpen={showDetailsModal} 
  onClose={() => setShowDetailsModal(false)}
  title={`${selectedCrop?.name} - विस्तृत जानकारी`}
  size="xl"
>
  {selectedCrop && (
    <div className="space-y-6">
      {/* Header with Image */}
      <div className="flex items-center space-x-6 mb-6">
        <img 
          src={selectedCrop.image} 
          alt={selectedCrop.name}
          className="w-24 h-24 object-cover rounded-xl"
        />
        <div>
          <h4 className="text-2xl font-bold text-gray-800">{selectedCrop.name}</h4>
          <p className="text-green-600 font-semibold">{selectedCrop.suitability}% उपयुक्तता</p>
          <p className="text-gray-600">{selectedCrop.season} सीज़न के लिए सुझावित</p>
        </div>
      </div>

      {/* Detailed Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(selectedCrop.details).map(([key, value]) => (
          <div key={key} className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 font-medium capitalize mb-1">
              {key.replace(/([A-Z])/g, ' $1')}
            </div>
            <div className="text-lg font-semibold text-gray-800">
              {String(value)}
            </div>
          </div>
        ))}
      </div>

      {/* ✅ REMOVED: Add to Farm Plan and Get Seeds Quote buttons */}
    </div>
  )}
</Modal>

    </div>
  );
};

export default CropRecommendation;
