import React from 'react';
import FarmIcon from '../../ui/FarmIcon';
import Modal from '../../ui/Modal';

interface TreatmentPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  pestName: string;
  severity: string;
}

const TreatmentPlanModal: React.FC<TreatmentPlanModalProps> = ({ 
  isOpen, 
  onClose, 
  pestName, 
  severity 
}) => {
  const treatmentPlans: { [key: string]: any } = {
    'Aphids': {
      immediate: [
        'Spray neem oil solution (2ml per liter of water)',
        'Remove heavily infested leaves and dispose safely',
        'Increase air circulation around plants'
      ],
      weekly: [
        'Apply insecticidal soap every 3-4 days',
        'Release ladybugs as biological control',
        'Monitor new growth areas daily'
      ],
      preventive: [
        'Plant companion crops like catnip and garlic',
        'Avoid over-fertilizing with nitrogen',
        'Maintain proper plant spacing'
      ],
      materials: [
        'Neem oil - 100ml',
        'Spray bottle - 1L capacity',
        'Insecticidal soap - 250ml',
        'Protective gloves'
      ]
    },
    'Caterpillar': {
      immediate: [
        'Hand-pick visible caterpillars in early morning',
        'Apply BT (Bacillus thuringiensis) spray',
        'Set up pheromone traps around affected area'
      ],
      weekly: [
        'Reapply BT spray every 7-10 days',
        'Check undersides of leaves for egg masses',
        'Maintain trap monitoring schedule'
      ],
      preventive: [
        'Encourage beneficial insects like parasitic wasps',
        'Use row covers during peak season',
        'Rotate crops annually'
      ],
      materials: [
        'BT spray - 500ml',
        'Pheromone traps - 4 units',
        'Collection container for hand-picking',
        'Magnifying glass for egg detection'
      ]
    }
  };

  const plan = treatmentPlans[pestName] || treatmentPlans['Aphids'];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Treatment Plan: ${pestName}`} size="xl">
      <div className="space-y-6">
        {/* Severity Alert */}
        <div className={`p-4 rounded-lg border ${
          severity === 'High' ? 'bg-red-50 border-red-200' :
          severity === 'Medium' ? 'bg-yellow-50 border-yellow-200' :
          'bg-green-50 border-green-200'
        }`}>
          <div className="flex items-center space-x-2">
            <span className={`text-lg ${
              severity === 'High' ? 'text-red-600' :
              severity === 'Medium' ? 'text-yellow-600' :
              'text-green-600'
            }`}>⚠️</span>
            <span className={`font-semibold ${
              severity === 'High' ? 'text-red-800' :
              severity === 'Medium' ? 'text-yellow-800' :
              'text-green-800'
            }`}>
              {severity} Severity Level - {severity === 'High' ? 'Immediate action required' : 
                                         severity === 'Medium' ? 'Action needed within 2-3 days' : 
                                         'Monitor and treat as preventive measure'}
            </span>
          </div>
        </div>

        {/* Treatment Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Immediate Actions */}
          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <h4 className="text-lg font-bold text-red-800 mb-4 flex items-center">
              <span className="mr-2">🚨</span>
              Immediate Actions (Today)
            </h4>
            <ul className="space-y-2">
              {plan.immediate.map((step: string, index: number) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-red-600 font-bold">{index + 1}.</span>
                  <span className="text-red-700">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weekly Actions */}
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h4 className="text-lg font-bold text-blue-800 mb-4 flex items-center">
              <span className="mr-2">📅</span>
              Weekly Actions
            </h4>
            <ul className="space-y-2">
              {plan.weekly.map((step: string, index: number) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-blue-600 font-bold">{index + 1}.</span>
                  <span className="text-blue-700">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Preventive Measures */}
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h4 className="text-lg font-bold text-green-800 mb-4 flex items-center">
              <span className="mr-2">🛡️</span>
              Preventive Measures
            </h4>
            <ul className="space-y-2">
              {plan.preventive.map((step: string, index: number) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold">{index + 1}.</span>
                  <span className="text-green-700">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Required Materials */}
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h4 className="text-lg font-bold text-purple-800 mb-4 flex items-center">
              <span className="mr-2">🛍️</span>
              Required Materials
            </h4>
            <ul className="space-y-2">
              {plan.materials.map((item: string, index: number) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="text-purple-600">✓</span>
                  <span className="text-purple-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-4 border-t">
          <button className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold">
            📱 Send to WhatsApp
          </button>
          <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
            📧 Email Treatment Plan
          </button>
          <button className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-semibold">
            🛒 Order Materials
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TreatmentPlanModal;
