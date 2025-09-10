import React, { useState, useRef } from 'react';
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';

const VoiceAssistant: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [response, setResponse] = useState('');
  const [isMinimized, setIsMinimized] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [language, setLanguage] = useState('en');
  const responseRef = useRef<string>('');
  
  const { speak, cancel } = useSpeechSynthesis();
  const { listen, stop, transcript } = useSpeechRecognition({
    onResult: (result: string) => {
      if (result && result !== responseRef.current) {
        responseRef.current = result;
        processVoiceCommand(result);
      }
    }
  });

  const translations = {
    en: {
      header: "Voice Assistant",
      listening: "Listening...",
      weatherResponse: "Today's weather is sunny with 28 degrees celsius. Good conditions for irrigation.",
      priceResponse: "Current wheat price is 2800 rupees per quintal in your local market.",
      pestResponse: "I can help identify pests. Please take a photo of the affected plant.",
      tryCommands: "Try saying:",
      commands: ['Weather update', 'Crop prices', 'Pest help']
    },
    hi: {
      header: "आवाज़ सहायक",
      listening: "सुन रहा हूँ...",
      weatherResponse: "आज का मौसम धूप वाला है और तापमान 28 डिग्री सेल्सियस है। सिंचाई के लिए अच्छी स्थिति है।",
      priceResponse: "वर्तमान में गेहूं की कीमत आपके स्थानीय बाजार में 2800 रुपये प्रति क्विंटल है।",
      pestResponse: "मैं कीटों की पहचान में मदद कर सकता हूँ। कृपया प्रभावित पौधे की फोटो लें।",
      tryCommands: "कहने की कोशिश करें:",
      commands: ['मौसम अपडेट', 'फसल कीमत', 'कीट मदद']
    }
  };

  const currentLang = translations[language as keyof typeof translations] || translations.en;

  const processVoiceCommand = async (command: string) => {
    if (!command.trim()) return;
    
    cancel();
    setResponse('');
    
    const lowerCommand = command.toLowerCase();
    let responseText = '';
    
    if (lowerCommand.includes('weather') || lowerCommand.includes('मौसम')) {
      responseText = currentLang.weatherResponse;
    } else if (lowerCommand.includes('price') || lowerCommand.includes('कीमत')) {
      responseText = currentLang.priceResponse;
    } else if (lowerCommand.includes('pest') || lowerCommand.includes('कीट')) {
      responseText = currentLang.pestResponse;
    } else {
      responseText = language === 'hi' 
        ? "मैं आपकी मदद के लिए यहाँ हूँ। मौसम, कीमत, या कीट के बारे में पूछें।"
        : "I'm here to help. Ask about weather, prices, or pests.";
    }
    
    setResponse(responseText);
    
    setTimeout(() => {
      speak({ text: responseText });
    }, 500);
  };

  const toggleListening = () => {
    if (isListening) {
      stop();
      setIsListening(false);
      responseRef.current = '';
    } else {
      cancel();
      setResponse('');
      responseRef.current = '';
      listen({ continuous: false });
      setIsListening(true);
    }
  };

  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
  };

  const closeAssistant = () => {
    stop();
    cancel();
    setIsVisible(false);
    setIsListening(false);
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg"
        >
          <span className="text-lg">🎤</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className={`bg-white rounded-lg shadow-xl border transition-all duration-300 ${
        isMinimized ? 'w-72 h-16' : 'w-80'
      }`}>
        {/* Header */}
        <div className="p-3 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-lg">🎤</span>
            <h3 className="font-semibold text-sm">{currentLang.header}</h3>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-blue-600 text-white rounded px-2 py-1 text-xs"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>
          <div className="flex space-x-1">
            <button 
              onClick={toggleMinimized}
              className="text-white hover:bg-blue-600 rounded p-1 text-xs"
            >
              {isMinimized ? '⬆️' : '⬇️'}
            </button>
            <button 
              onClick={closeAssistant}
              className="text-white hover:bg-blue-600 rounded p-1 text-xs"
            >
              ✖️
            </button>
          </div>
        </div>

        {/* Content */}
        {!isMinimized && (
          <div className="p-4 space-y-3">
            <button
              onClick={toggleListening}
              className={`w-full p-3 rounded-lg text-white font-bold text-sm ${
                isListening 
                  ? 'bg-red-500 animate-pulse' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isListening ? `🔴 ${currentLang.listening}` : `🎤 ${currentLang.header}`}
            </button>
            
            {transcript && (
              <div className="p-3 bg-gray-100 rounded">
                <p className="text-xs text-gray-600 mb-1">
                  {language === 'hi' ? 'आपने कहा:' : 'You said:'}
                </p>
                <p className="font-medium text-sm">{transcript}</p>
              </div>
            )}
            
            {response && (
              <div className="p-3 bg-blue-100 rounded">
                <p className="text-xs text-blue-600 mb-1">
                  {language === 'hi' ? 'सहायक:' : 'Assistant:'}
                </p>
                <p className="font-medium text-sm">{response}</p>
              </div>
            )}
            
            <div>
              <p className="text-xs text-gray-500 mb-2">{currentLang.tryCommands}</p>
              <div className="flex flex-wrap gap-1">
                {currentLang.commands.map((cmd) => (
                  <span key={cmd} className="text-xs bg-gray-200 px-2 py-1 rounded">
                    "{cmd}"
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceAssistant;
