import React, { useState } from 'react';
import FarmIcon from '../../ui/FarmIcon';
import TreatmentPlanModal from '../modals/TreatmentPlanModal';
import ContactExpertModal from '../modals/ContactExpertModal';

const PestDetectionComponent: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // ✅ NEW: Modal states
  const [showTreatmentModal, setShowTreatmentModal] = useState(false);
  const [showExpertModal, setShowExpertModal] = useState(false);

  const pestDatabase = [
    {
      name: 'Aphids',
      severity: 'Medium',
      treatment: 'Neem oil spray',
      description: 'Small soft-bodied insects that feed on plant sap',
      symptoms: 'Yellow leaves, stunted growth, honeydew secretion'
    },
    {
      name: 'Caterpillar',
      severity: 'High', 
      treatment: 'BT spray application',
      description: 'Larvae that eat leaves and stems',
      symptoms: 'Holes in leaves, visible droppings'
    },
    {
      name: 'Whitefly',
      severity: 'Medium',
      treatment: 'Yellow sticky traps',
      description: 'Small white flying insects',
      symptoms: 'Yellowing leaves, wilting'
    }
  ];

  const simulateAIAnalysis = () => {
    const randomPest = pestDatabase[Math.floor(Math.random() * pestDatabase.length)];
    return randomPest;
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setAnalysisResult(null);
      setIsAnalyzing(true);

      setTimeout(() => {
        const result = simulateAIAnalysis();
        setAnalysisResult(result);
        setIsAnalyzing(false);
      }, 3000);
    }
  };

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
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-400 transition-colors">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <FarmIcon name="pest-detection" size="xl" className="text-blue-600" />
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Upload Plant Image</h3>
              <p className="text-gray-600">Take a clear photo of affected leaves, stems, or the pest itself</p>
            </div>
            
            <div className="flex justify-center space-x-4">
              <label className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium cursor-pointer">
                📁 Choose Image File
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageSelect}
                />
              </label>
              
              <button 
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
                onClick={() => alert('Camera feature would be implemented here')}
              >
                📸 Take Photo
              </button>
            </div>
            
            <p className="text-xs text-gray-400">
              Supported formats: JPG, PNG, HEIC (Max size: 5MB)
            </p>
          </div>
        </div>

        {/* Image Preview and Analysis */}
        {selectedImage && (
          <div className="mt-8 space-y-6">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Uploaded Image</h4>
              <img 
                src={selectedImage} 
                alt="Selected plant" 
                className="mx-auto max-w-md h-64 object-cover rounded-lg shadow-lg"
              />
            </div>

            {isAnalyzing && (
              <div className="text-center py-8">
                <div className="inline-flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="text-lg font-medium text-blue-600">AI Analysis in progress...</span>
                </div>
              </div>
            )}

            {analysisResult && !isAnalyzing && (
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">🐛</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-red-800 mb-2">
                      Pest Detected: {analysisResult.name}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <span className="font-semibold text-red-700">Severity:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                          analysisResult.severity === 'High' ? 'bg-red-100 text-red-800' :
                          analysisResult.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {analysisResult.severity}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-red-700">Treatment:</span>
                        <span className="ml-2 text-gray-700">{analysisResult.treatment}</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-gray-700 mb-2">
                        <span className="font-semibold">Description:</span> {analysisResult.description}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Symptoms:</span> {analysisResult.symptoms}
                      </p>
                    </div>
                    
                    {/* ✅ WORKING BUTTONS */}
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => setShowTreatmentModal(true)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
                      >
                        Get Treatment Plan
                      </button>
                      <button 
                        onClick={() => setShowExpertModal(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                      >
                        Contact Expert
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ✅ COMMON PEST EXAMPLES WITH YOUR IMAGES */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h5 className="text-xl font-semibold text-gray-800 mb-6">Common Pest Examples</h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { 
              name: 'Aphids', 
              image: '/images/pests/aphids.png', 
              severity: 'Medium' 
            },
            { 
              name: 'Caterpillar', 
              image: '/images/pests/caterpillar.png', 
              severity: 'High' 
            },
            { 
              name: 'Sample 1', 
              image: '/images/pests/pest-sample-1.png', 
              severity: 'Low' 
            },
            { 
              name: 'Sample 2', 
              image: '/images/pests/pest-sample-2.png', 
              severity: 'Medium' 
            }
          ].map((pest, index) => (
            <div key={index} className="text-center space-y-3">
              <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden mx-auto shadow-md">
                <img
                  src={pest.image}
                  alt={pest.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h6 className="font-semibold text-gray-800">{pest.name}</h6>
              <p className="text-sm text-gray-600">Severity: {pest.severity}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ WORKING MODALS */}
      {analysisResult && (
        <>
          <TreatmentPlanModal 
            isOpen={showTreatmentModal}
            onClose={() => setShowTreatmentModal(false)}
            pestName={analysisResult.name}
            severity={analysisResult.severity}
          />
          
          <ContactExpertModal 
            isOpen={showExpertModal}
            onClose={() => setShowExpertModal(false)}
            pestName={analysisResult.name}
          />
        </>
      )}
    </div>
  );
};

export default PestDetectionComponent;
