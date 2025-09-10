import { 
  mockMarketPrices, 
  mockCropRecommendations, 
  mockPestDatabase, 
  mockWeatherAlerts,
  mockFarmingTips,
  mockCommunityPosts 
} from '../data/mockData';
import { MarketPrice, Crop, Location, PestDetection, CommunityPost } from '../types';

export class DemoService {
  // Market Prices with live simulation
  getMarketPrices(): MarketPrice[] {
    return mockMarketPrices.map(price => ({
      id: `market-${Date.now()}-${Math.random()}`,
      crop: price.crop,
      variety: 'Standard',
      price: price.price + Math.floor(Math.random() * 100) - 50,
      unit: 'quintal',
      market: price.market,
      marketType: 'mandi' as const,
      location: {
        latitude: 28.6139 + Math.random() * 5,
        longitude: 77.2090 + Math.random() * 5,
        district: price.market.split(' ')[0],
        state: 'Demo State',
        pincode: '000000'
      },
      date: new Date(),
      trend: {
        direction: price.trend as 'up' | 'down' | 'stable',
        percentage: Math.random() * 10,
        period: 'daily' as const
      },
      volume: price.volume || Math.floor(Math.random() * 500) + 100,
      quality: 'Grade A' as const,
      source: 'government' as const,
      verified: true
    }));
  }

  // FIX: Crop Recommendations with proper typing
  getCropRecommendations(location: Location, season: 'kharif' | 'rabi' | 'zaid'): Crop[] {
    return mockCropRecommendations
      .filter(crop => crop.season === season)
      .map(crop => ({ 
        ...crop,
        // Remove the locationSuitability property that doesn't exist in Crop type
        id: `crop-${crop.id}`
      } as Crop)); // FIX: Explicit type assertion
  }

  // FIX: Pest Detection Simulation with proper typing
  async detectPest(imageFile: File): Promise<PestDetection> {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const pestTypes = Object.keys(mockPestDatabase);
    const randomPest = pestTypes[Math.floor(Math.random() * pestTypes.length)];
    const pestData = mockPestDatabase[randomPest as keyof typeof mockPestDatabase];

    return {
      id: `detection-${Date.now()}`,
      farmerId: 'current-farmer',
      imageUrl: URL.createObjectURL(imageFile),
      uploadedAt: new Date(),
      detectedPests: [pestData], // FIX: This should work now with proper types
      detectedDiseases: [],
      confidence: pestData.confidence,
      cropType: 'vegetable',
      location: {
        latitude: 0,
        longitude: 0,
        district: 'Demo District',
        state: 'Demo State',
        pincode: '000000'
      },
      status: 'completed',
      expertVerified: false,
      treatment: [
        `${pestData.organicTreatments[0]?.name} का प्रयोग करें`,
        'प्रभावित हिस्सों को हटा दें',
        'नियमित निरीक्षण करें',
        'आवश्यक होने पर कृषि विशेषज्ञ से सलाह लें'
      ]
    };
  }

  // Rest of the methods stay the same...
  getCommunityPosts(): CommunityPost[] {
    return mockCommunityPosts;
  }

  getFarmingTips(category?: string) {
    if (category) {
      return mockFarmingTips.filter(tip => tip.category.includes(category));
    }
    return mockFarmingTips;
  }

  getWeatherAlerts() {
    return mockWeatherAlerts;
  }

  translateText(text: string, targetLang: 'hi' | 'en'): string {
    const translations: {[key: string]: {hi: string, en: string}} = {
      'Weather': { hi: 'मौसम', en: 'Weather' },
      'Crop': { hi: 'फसल', en: 'Crop' },
      'Price': { hi: 'कीमत', en: 'Price' },
      'Market': { hi: 'बाजार', en: 'Market' },
      'Pest': { hi: 'कीट', en: 'Pest' },
      'Disease': { hi: 'रोग', en: 'Disease' },
      'Fertilizer': { hi: 'खाद', en: 'Fertilizer' },
      'Irrigation': { hi: 'सिंचाई', en: 'Irrigation' },
      'Seed': { hi: 'बीज', en: 'Seed' }
    };

    return translations[text]?.[targetLang] || text;
  }

  async getChatbotResponse(message: string, language: 'hi' | 'en'): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const responses = {
      hi: {
        weather: 'आज का मौसम अच्छा है। तापमान 28°C है और हल्की हवा चल रही है। सिंचाई के लिए उपयुक्त समय है।',
        price: 'वर्तमान में गेहूं की कीमत ₹2,850 प्रति क्विंटल है। कल के मुकाबले ₹50 की वृद्धि हुई है।',
        pest: 'कृपया प्रभावित पौधे की तस्वीर अपलोड करें। मैं कीट की पहचान करके उपचार बताऊंगा।',
        crop: 'रबी सीजन के लिए गेहूं और चना की खेती सबसे उपयुक्त है। आपके क्षेत्र की मिट्टी के अनुसार सुझाव दे सकता हूं।',
        default: 'मैं आपकी खेती संबंधी समस्याओं में मदद कर सकता हूं। मौसम, कीमत, कीट-रोग, या फसल के बारे में पूछें।'
      },
      en: {
        weather: 'Today\'s weather is good. Temperature is 28°C with light winds. Good time for irrigation.',
        price: 'Current wheat price is ₹2,850 per quintal. It has increased by ₹50 compared to yesterday.',
        pest: 'Please upload a photo of the affected plant. I will identify the pest and suggest treatment.',
        crop: 'For Rabi season, wheat and chickpea cultivation is most suitable. I can suggest based on your soil type.',
        default: 'I can help with your farming problems. Ask about weather, prices, pests, diseases, or crops.'
      }
    };

    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('weather') || lowerMessage.includes('मौसम')) {
      return responses[language].weather;
    } else if (lowerMessage.includes('price') || lowerMessage.includes('कीमत')) {
      return responses[language].price;
    } else if (lowerMessage.includes('pest') || lowerMessage.includes('कीट')) {
      return responses[language].pest;
    } else if (lowerMessage.includes('crop') || lowerMessage.includes('फसल')) {
      return responses[language].crop;
    }
    
    return responses[language].default;
  }
}

