import React, { useState } from 'react';
import IconComponent from '../icons/IconComponents';

interface Activity {
  id: string;
  title: string;
  description: string;
  icon: 'tractor' | 'farmer' | 'plant' | 'livestock' | 'harvest' | 'organic' | 'irrigation';
  progress: number;
  status: 'active' | 'completed' | 'planned';
  category: string;
}

const ActivityCards: React.FC = () => {
  const [activities] = useState<Activity[]>([
    {
      id: '1',
      title: 'Field Preparation',
      description: 'Preparing soil for wheat plantation',
      icon: 'tractor',
      progress: 85,
      status: 'active',
      category: 'Cultivation'
    },
    {
      id: '2',
      title: 'Organic Farming',
      description: 'Implementing sustainable practices',
      icon: 'organic',
      progress: 60,
      status: 'active',
      category: 'Sustainability'
    },
    {
      id: '3',
      title: 'Livestock Care',
      description: 'Daily health checkup and feeding',
      icon: 'livestock',
      progress: 100,
      status: 'completed',
      category: 'Animal Husbandry'
    },
    {
      id: '4',
      title: 'Harvest Planning',
      description: 'Planning for next season harvest',
      icon: 'harvest',
      progress: 30,
      status: 'planned',
      category: 'Planning'
    },
    {
      id: '5',
      title: 'Irrigation System',
      description: 'Installing drip irrigation',
      icon: 'irrigation',
      progress: 75,
      status: 'active',
      category: 'Infrastructure'
    },
    {
      id: '6',
      title: 'Crop Monitoring',
      description: 'Weekly crop health assessment',
      icon: 'plant',
      progress: 90,
      status: 'active',
      category: 'Monitoring'
    }
  ]);

  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity);
    // You can open a detailed modal here
    console.log(`Opening details for: ${activity.title}`);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-500';
      case 'active': return 'bg-blue-500';
      case 'planned': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <IconComponent name="farmer" size={32} className="mr-3" />
          Farm Activities
        </h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
          + New Activity
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <div 
            key={activity.id}
            className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer transform hover:scale-105"
            onClick={() => handleActivityClick(activity)}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <IconComponent name={activity.icon} size={48} />
              <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(activity.status)}`}>
                {activity.status.toUpperCase()}
              </div>
            </div>

            {/* Content */}
            <h3 className="font-semibold text-gray-800 mb-2">{activity.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
            <p className="text-xs text-blue-600 font-medium mb-4">{activity.category}</p>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">{activity.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${getProgressColor(activity.progress)}`}
                  style={{ width: `${activity.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button 
                className="flex-1 bg-blue-500 text-white py-2 px-3 rounded text-sm hover:bg-blue-600 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Viewing details for: ${activity.title}`);
                }}
              >
                View Details
              </button>
              <button 
                className="bg-green-500 text-white py-2 px-3 rounded text-sm hover:bg-green-600 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Updating: ${activity.title}`);
                }}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Summary */}
      <div className="mt-8 grid grid-cols-4 gap-4">
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{activities.filter(a => a.status === 'completed').length}</div>
          <div className="text-sm text-green-700">Completed</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{activities.filter(a => a.status === 'active').length}</div>
          <div className="text-sm text-blue-700">Active</div>
        </div>
        <div className="text-center p-4 bg-yellow-50 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">{activities.filter(a => a.status === 'planned').length}</div>
          <div className="text-sm text-yellow-700">Planned</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{Math.round(activities.reduce((acc, a) => acc + a.progress, 0) / activities.length)}%</div>
          <div className="text-sm text-purple-700">Avg. Progress</div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCards;
