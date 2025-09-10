import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SmartFarmDashboard from './components/dashboard/SmartFarmDashboard';
import WeatherDashboard from './components/weather/WeatherDashboard';
import CropRecommendation from './components/crop/CropRecommendation';
import PestDetectionComponent from './components/pest/PestDetection';
import MarketPriceTracker from './components/market/MarketPriceTracker';
import CommunityDisplay from './components/community/FarmerCommunity';
import ProduceMarketplace from './components/marketplace/ProduceMarketplace';
import AgriChatbot from './components/chatbot/AgriChatbot';
import VoiceAssistant from './components/voice/VoiceAssistant';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import FarmIcon from './ui/FarmIcon';
import { Location } from './types';

// Main App Layout Component
const AppLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  
  const [userLocation] = useState<Location>({
    latitude: 28.6139,
    longitude: 77.2090,
    district: 'New Delhi',
    state: 'Delhi',
    pincode: '110001'
  });

  // Update active tab based on URL
  useEffect(() => {
    const path = location.pathname.slice(1) || 'dashboard';
    setActiveTab(path);
  }, [location]);

  const navigation = [
    { 
      id: 'dashboard', 
      name: 'Dashboard', 
      icon: 'dashboard', 
      path: '/dashboard',
      description: 'Farm overview and stats'
    },
    { 
      id: 'weather', 
      name: 'Weather', 
      icon: 'weather', 
      path: '/weather',
      description: 'Weather forecasts and alerts'
    },
    { 
      id: 'crops', 
      name: 'Crops', 
      icon: 'crops', 
      path: '/crops',
      description: 'Crop recommendations'
    },
    { 
      id: 'pest-detection', 
      name: 'Pest Detection', 
      icon: 'pest-detection', 
      path: '/pest-detection',
      description: 'AI-powered pest identification'
    },
    { 
      id: 'market', 
      name: 'Market', 
      icon: 'market', 
      path: '/market',
      description: 'Live crop prices and trends'
    },
    { 
      id: 'community', 
      name: 'Community', 
      icon: 'community', 
      path: '/community',
      description: 'Farmer discussions and help'
    },
    { 
      id: 'marketplace', 
      name: 'Marketplace', 
      icon: 'marketplace', 
      path: '/marketplace',
      description: 'Buy and sell produce'
    }
  ];

  const handleNavigation = (path: string, id: string) => {
    setActiveTab(id);
    window.history.pushState({}, '', path);
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <SmartFarmDashboard />;
      case 'weather':
        return <WeatherDashboard location={userLocation} />;
      case 'crops':
        return <CropRecommendation location={userLocation} season="rabi" />;
      case 'pest-detection':
        return <PestDetectionComponent />;
      case 'market':
        return <MarketPriceTracker location={userLocation} selectedCrops={['wheat', 'rice', 'corn']} />;
      case 'community':
        return <CommunityDisplay />;
      case 'marketplace':
        return <ProduceMarketplace />;
      default:
        return <SmartFarmDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Enhanced Professional Sidebar */}
      <aside className={`${
        sidebarCollapsed ? 'w-18' : 'w-72'
      } bg-white shadow-lg transition-all duration-300 flex flex-col fixed h-full z-30 border-r border-gray-100`}>
        
        {/* ✅ ENHANCED LOGO SECTION - WHITE BACKGROUND & BIGGER (Using XL instead of XXL) */}
        <div className="p-8 border-b border-gray-100 relative">
          <div className="flex items-center space-x-6">
            {/* ✅ BIGGER WHITE BACKGROUND LOGO - Using XL size instead of XXL */}
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl border-2 border-gray-200 p-4">
              <FarmIcon name="logo" size="xl" className="text-green-600" />
            </div>
            {!sidebarCollapsed && (
              <div>
                {/* ✅ BIGGER NAME TEXT */}
                <h1 className="text-3xl font-bold text-gray-800 leading-tight">Krishi Sahaayak</h1>
                {/* ✅ LARGER SUBTITLE */}
                <p className="text-base text-gray-500 mt-2 font-medium">Smart Farm Assistant</p>
              </div>
            )}
          </div>
          
          {/* Collapse Toggle */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="absolute -right-3 top-12 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
          >
            <span className="text-xs text-gray-600">
              {sidebarCollapsed ? '▶' : '◀'}
            </span>
          </button>
        </div>

        {/* Enhanced Navigation */}
        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-2 px-3">
            {navigation.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.path, item.id)}
                  className={`w-full flex items-center px-4 py-4 rounded-xl text-left transition-all duration-200 group relative ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-green-600'
                  }`}
                >
                  {/* Active Indicator */}
                  {activeTab === item.id && (
                    <div className="absolute inset-0 bg-white/10 rounded-xl"></div>
                  )}
                  
                  <div className={`${sidebarCollapsed ? 'mx-auto' : 'mr-4'} relative z-10`}>
                    <FarmIcon 
                      name={item.icon} 
                      size="lg"
                      className={`${activeTab === item.id ? 'text-white' : 'text-gray-600 group-hover:text-green-600'}`}
                    />
                  </div>
                  
                  {!sidebarCollapsed && (
                    <div className="flex-1 relative z-10">
                      <div className="font-semibold text-base">{item.name}</div>
                      <div className={`text-sm mt-0.5 opacity-75 ${
                        activeTab === item.id ? 'text-green-100' : 'text-gray-500'
                      }`}>
                        {item.description}
                      </div>
                    </div>
                  )}

                  {/* Active Side Indicator */}
                  {activeTab === item.id && !sidebarCollapsed && (
                    <div className="w-2 h-8 bg-white rounded-full opacity-80 relative z-10"></div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Enhanced User Profile */}
        <div className="p-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-500 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">FS</span>
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1">
                <div className="font-semibold text-base text-gray-800">Farmer Singh</div>
                <div className="text-sm text-gray-500">25 acres • Delhi</div>
                <div className="text-sm text-green-600 font-medium">✅ Verified Farmer</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarCollapsed ? 'ml-18' : 'ml-72'} transition-all duration-300`}>
        {/* Enhanced Top Navigation Bar */}
        <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-20">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <FarmIcon 
                  name={activeTab} 
                  size="xl" // ✅ Using XL instead of XXL
                  className="text-green-600"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {navigation.find(item => item.id === activeTab)?.name || 'Dashboard'}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {navigation.find(item => item.id === activeTab)?.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Enhanced Notifications */}
                <button className="relative p-3 hover:bg-gray-50 rounded-xl transition-colors group">
                  <FarmIcon name="notifications" size="lg" className="text-gray-600 group-hover:text-green-600" />
                  <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>
                
                {/* Enhanced Weather Info */}
                <div className="bg-gradient-to-r from-blue-50 to-sky-50 px-4 py-3 rounded-xl border border-blue-100">
                  <div className="flex items-center space-x-3 text-blue-800">
                    <FarmIcon name="weather" size="md" />
                    <span className="text-base font-medium">28°C</span>
                    <span className="text-blue-600">•</span>
                    <FarmIcon name="sunny" size="md" />
                    <span className="text-base">Sunny</span>
                  </div>
                </div>
                
                {/* Enhanced Date */}
                <div className="text-right">
                  <div className="text-base font-semibold text-gray-800">
                    {new Date().toLocaleDateString('en-IN', { 
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short'
                    })}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date().getFullYear()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {renderActiveComponent()}
        </div>
      </main>

      {/* Floating Components */}
      <VoiceAssistant />
      <AgriChatbot />
    </div>
  );
};

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = localStorage.getItem('user');
  return user ? <>{children}</> : <Navigate to="/login" />;
};

// Main App Component
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
