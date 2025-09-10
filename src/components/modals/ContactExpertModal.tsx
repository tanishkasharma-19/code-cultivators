import React, { useState } from 'react';
import FarmIcon from '../../ui/FarmIcon';
import Modal from '../../ui/Modal';

interface ContactExpertModalProps {
  isOpen: boolean;
  onClose: () => void;
  pestName?: string;
}

const ContactExpertModal: React.FC<ContactExpertModalProps> = ({ 
  isOpen, 
  onClose, 
  pestName = '' 
}) => {
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);
  const [message, setMessage] = useState(`Hi, I need help with ${pestName} pest control on my farm. Can you please guide me?`);

  const experts = [
    {
      id: 'dr_sharma',
      name: 'Dr. Rajesh Sharma',
      specialization: 'Pest Control Specialist',
      experience: '15 years',
      rating: 4.9,
      languages: 'Hindi, English, Punjabi',
      availability: 'Available now',
      price: '₹150/consultation',
      image: '/images/experts/expert1.png'
    },
    {
      id: 'dr_patel',
      name: 'Dr. Priya Patel',
      specialization: 'Integrated Pest Management',
      experience: '12 years',
      rating: 4.8,
      languages: 'Hindi, English, Gujarati',
      availability: 'Available in 30 mins',
      price: '₹200/consultation',
      image: '/images/experts/expert2.png'
    },
    {
      id: 'dr_singh',
      name: 'Dr. Harpreet Singh',
      specialization: 'Organic Pest Control',
      experience: '10 years',
      rating: 4.7,
      languages: 'Hindi, English, Punjabi',
      availability: 'Available tomorrow 9 AM',
      price: '₹120/consultation',
      image: '/images/experts/expert3.png'
    }
  ];

  const handleContactExpert = (expertId: string) => {
    const expert = experts.find(e => e.id === expertId);
    alert(`Connecting you with ${expert?.name}. You will receive a call/message within 5 minutes.`);
    onClose();
  };

  const handleInstantHelp = () => {
    alert('Instant help request sent! Our support team will call you within 2 minutes.');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Contact Agricultural Expert" size="xl">
      <div className="space-y-6">
        {/* Instant Help Option */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">🚨</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-red-800">Urgent Help Needed?</h4>
                <p className="text-red-700">Get immediate assistance within 2 minutes</p>
              </div>
            </div>
            <button 
              onClick={handleInstantHelp}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              📞 Call Now
            </button>
          </div>
        </div>

        {/* Expert Selection */}
        <div>
          <h4 className="text-xl font-bold text-gray-800 mb-4">Choose an Expert</h4>
          <div className="grid grid-cols-1 gap-4">
            {experts.map((expert) => (
              <div 
                key={expert.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedExpert === expert.id 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedExpert(expert.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                    <FarmIcon name="farmer" size="lg" className="text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="text-lg font-bold text-gray-800">{expert.name}</h5>
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-500">⭐</span>
                        <span className="font-semibold">{expert.rating}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-sm">
                      <div>
                        <span className="text-gray-600">Specialization:</span>
                        <p className="font-medium text-blue-600">{expert.specialization}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Experience:</span>
                        <p className="font-medium">{expert.experience}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Languages:</span>
                        <p className="font-medium">{expert.languages}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Price:</span>
                        <p className="font-medium text-green-600">{expert.price}</p>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex items-center space-x-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        expert.availability.includes('now') 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {expert.availability}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Box */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Describe your pest problem in detail..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-4 border-t">
          <button 
            onClick={() => selectedExpert && handleContactExpert(selectedExpert)}
            disabled={!selectedExpert}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
              selectedExpert 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            💬 Connect with Expert
          </button>
          <button 
            onClick={() => alert('Video call scheduled! You will receive a meeting link on WhatsApp.')}
            disabled={!selectedExpert}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
              selectedExpert 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            📹 Schedule Video Call
          </button>
        </div>

        {/* Contact Methods */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h5 className="font-semibold text-gray-800 mb-3">Alternative Contact Methods</h5>
          <div className="grid grid-cols-3 gap-4">
            <button 
              onClick={() => alert('WhatsApp chat initiated! Check your WhatsApp for expert contact.')}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              📱 WhatsApp
            </button>
            <button 
              onClick={() => alert('Phone call requested! You will receive a call within 5 minutes.')}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              📞 Phone Call
            </button>
            <button 
              onClick={() => alert('Email sent! Expert will respond within 2 hours.')}
              className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors font-medium"
            >
              📧 Email
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ContactExpertModal;
