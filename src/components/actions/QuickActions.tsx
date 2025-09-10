import React, { useState } from 'react';

const QuickActions: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const actions = [
    {
      id: 'irrigation',
      title: 'Schedule Irrigation',
      icon: '💧',
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'Set up automatic watering schedule for your crops'
    },
    {
      id: 'report',
      title: 'Report Issue',
      icon: '📋',
      color: 'bg-green-500 hover:bg-green-600',
      description: 'Report pest problems, disease outbreaks, or equipment issues'
    },
    {
      id: 'generate',
      title: 'Generate Report',
      icon: '📊',
      color: 'bg-yellow-500 hover:bg-yellow-600',
      description: 'Create detailed farming reports and analytics'
    },
    {
      id: 'reminder',
      title: 'Set Reminder',
      icon: '🔔',
      color: 'bg-purple-500 hover:bg-purple-600',
      description: 'Set reminders for important farming activities'
    }
  ];

  const handleActionClick = (actionId: string) => {
    setSelectedAction(actionId);
    setShowModal(true);
    
    // Simulate action execution
    const action = actions.find(a => a.id === actionId);
    console.log(`Executing: ${action?.title}`);
    
    // You can add specific logic for each action here
    switch(actionId) {
      case 'irrigation':
        handleIrrigation();
        break;
      case 'report':
        handleReportIssue();
        break;
      case 'generate':
        handleGenerateReport();
        break;
      case 'reminder':
        handleSetReminder();
        break;
    }
  };

  const handleIrrigation = () => {
    // Logic for irrigation scheduling
    setTimeout(() => {
      alert('🌊 Irrigation scheduled successfully!\nNext watering: Tomorrow 6:00 AM');
      setShowModal(false);
    }, 2000);
  };

  const handleReportIssue = () => {
    // Logic for reporting issues
    setTimeout(() => {
      alert('📝 Issue reported successfully!\nExpert will contact you within 2 hours');
      setShowModal(false);
    }, 2000);
  };

  const handleGenerateReport = () => {
    // Logic for generating reports
    setTimeout(() => {
      alert('📈 Report generated successfully!\nCheck your dashboard for detailed analytics');
      setShowModal(false);
    }, 2000);
  };

  const handleSetReminder = () => {
    // Logic for setting reminders
    setTimeout(() => {
      alert('⏰ Reminder set successfully!\nYou will be notified at the scheduled time');
      setShowModal(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <span className="text-3xl mr-3">⚡</span>
        <h2 className="text-2xl font-bold text-gray-800">Quick Actions</h2>
      </div>

      <div className="space-y-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleActionClick(action.id)}
            className={`w-full ${action.color} text-white p-4 rounded-lg transition-all transform hover:scale-105 shadow-md hover:shadow-lg`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{action.icon}</span>
              <div className="text-left">
                <div className="font-semibold">{action.title}</div>
                <div className="text-sm opacity-90">{action.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Action Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="text-center">
              <div className="text-4xl mb-4">⏳</div>
              <h3 className="text-lg font-semibold mb-2">Processing Action</h3>
              <p className="text-gray-600 mb-4">
                {actions.find(a => a.id === selectedAction)?.title}
              </p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
            </div>
          </div>
        </div>
      )}

      {/* Action Statistics */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">12</div>
          <div className="text-sm text-blue-700">Actions Today</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">5</div>
          <div className="text-sm text-green-700">Completed</div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
