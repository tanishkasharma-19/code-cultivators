import React from 'react';
import FarmIcon from '../../ui/FarmIcon';

const PestDetectionComponent: React.FC = () => {
  const pestSamples = [
    {
      name: 'Aphids',
      image: '/images/pests/aphids.png', // ✅ Changed from .jpg to .png
      severity: 'Medium',
      treatment: 'Neem oil spray'
    },
    {
      name: 'Caterpillar',
      image: '/images/pests/caterpillar.png', // ✅ Changed from .jpg to .png
      severity: 'High',
      treatment: 'BT spray application'
    },
    {
      name: 'Sample 1',
      image: '/images/pests/pest-sample-1.png', // ✅ Changed from .jpg to .png
      severity: 'Low',
      treatment: 'Natural predators'
    },
    {
      name: 'Sample 2',
      image: '/images/pests/pest-sample-2.png', // ✅ Changed from .jpg to .png
      severity: 'Medium',
      treatment: 'Organic pesticide'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <FarmIcon name="pest-detection" size="xl" className="mr-4 text-white" />
          AI Pest Detection
        </h1>
        <p className="text-blue-100 text-lg">Upload plant images and let AI identify pests</p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FarmIcon name="pest-detection" size="lg" className="text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Upload Plant Image</h3>
          <p className="text-gray-600 text-sm mb-6">Take a clear photo of affected leaves, stems, or the pest itself</p>
          
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium">
              📁 Choose Image File
            </button>
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium">
              📸 Take Photo
            </button>
          </div>
          
          <p className="text-xs text-gray-400 mt-4">
            Supported formats: JPG, PNG, HEIC (Max size: 5MB)
          </p>
        </div>
      </div>

      {/* Sample Pest Images - ✅ USING PNG */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Common Pest Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pestSamples.map((pest, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <img
                src={pest.image}
                alt={pest.name}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <h4 className="font-semibold text-gray-800">{pest.name}</h4>
              <p className="text-sm text-gray-600">Severity: {pest.severity}</p>
              <p className="text-xs text-gray-500 mt-1">{pest.treatment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PestDetectionComponent;
