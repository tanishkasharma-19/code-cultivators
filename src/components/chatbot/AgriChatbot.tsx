import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../../types';
import { ChatbotService } from '../../services/chatbotService';

const AgriChatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hello! I\'m your agricultural assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isMinimized, setIsMinimized] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatbotService = new ChatbotService();

  const translations = {
    en: {
      header: "Krishi Sahaayak",
      placeholder: "Ask about crops, weather, pests...",
      send: "Send",
      greeting: "Hello! I'm your agricultural assistant. How can I help you today?",
      weatherResponse: "Today's weather is sunny with 28°C temperature. Good conditions for most farming activities.",
      priceResponse: "Current wheat prices are around ₹2,800 per quintal in your local market.",
      pestResponse: "I can help identify pests. Please describe the symptoms or upload a photo.",
      quickActions: ['Weather update', 'Crop prices']
    },
    hi: {
      header: "कृषि सहायक",
      placeholder: "फसल, मौसम, कीट के बारे में पूछें...",
      send: "भेजें",
      greeting: "नमस्ते! मैं आपका कृषि सहायक हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?",
      weatherResponse: "आज का मौसम धूप वाला है और तापमान 28°C है। अधिकांश कृषि गतिविधियों के लिए अच्छी स्थिति है।",
      priceResponse: "वर्तमान में गेहूं की कीमत आपके स्थानीय बाजार में लगभग ₹2,800 प्रति क्विंटल है।",
      pestResponse: "मैं कीटों की पहचान में मदद कर सकता हूँ। कृपया लक्षण बताएं या फोटो अपलोड करें।",
      quickActions: ['मौसम अपडेट', 'फसल कीमत']
    }
  };

  const currentLang = translations[language as keyof typeof translations] || translations.en;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      let responseText = currentLang.greeting;
      
      if (inputText.toLowerCase().includes('weather') || inputText.toLowerCase().includes('मौसम')) {
        responseText = currentLang.weatherResponse;
      } else if (inputText.toLowerCase().includes('price') || inputText.toLowerCase().includes('कीमत')) {
        responseText = currentLang.priceResponse;
      } else if (inputText.toLowerCase().includes('pest') || inputText.toLowerCase().includes('कीट')) {
        responseText = currentLang.pestResponse;
      }
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: language === 'hi' ? 'क्षमा करें, एक त्रुटि हुई है।' : 'Sorry, I encountered an error.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg"
        >
          <span className="text-lg">💬</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`bg-white rounded-lg shadow-xl border transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-96'
      }`}>
        {/* Header */}
        <div className="p-3 border-b bg-green-500 text-white rounded-t-lg flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-lg">🌾</span>
            <h3 className="font-semibold text-sm">{currentLang.header}</h3>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-green-600 text-white rounded px-2 py-1 text-xs"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>
          <div className="flex space-x-1">
            <button 
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-green-600 rounded p-1 text-xs"
            >
              {isMinimized ? '⬆️' : '⬇️'}
            </button>
            <button 
              onClick={() => setIsVisible(false)}
              className="text-white hover:bg-green-600 rounded p-1 text-xs"
            >
              ✖️
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 h-64">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}>
                  <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.sender === 'user' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-800'
                  }`}>
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 px-3 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={currentLang.placeholder}
                  className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-400 text-sm"
                >
                  {currentLang.send}
                </button>
              </div>
              
              <div className="mt-2 flex flex-wrap gap-1">
                {currentLang.quickActions.map((action) => (
                  <button
                    key={action}
                    onClick={() => setInputText(action)}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AgriChatbot;
