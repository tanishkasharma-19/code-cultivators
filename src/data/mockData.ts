

import { CropCategory, Season, WaterRequirement, SeverityLevel } from '../types';

export const mockCropRecommendations = [
  {
    id: '1',
    name: 'गेहूं (Wheat)',
    scientificName: 'Triticum aestivum',
    category: 'cereals' as CropCategory, // FIX: Explicit type cast
    season: 'rabi' as Season, // FIX: Explicit type cast
    duration: 120,
    soilTypes: ['loam', 'clay'],
    waterRequirement: 'medium' as WaterRequirement, // FIX: Explicit type cast
    climateRequirement: {
      minTemperature: 15,
      maxTemperature: 25,
      optimalTemperature: 20,
      minRainfall: 300,
      maxRainfall: 1000,
      humidity: { min: 50, max: 70 },
      sunlightHours: 6
    },
    fertilizers: [],
    pests: [],
    diseases: [],
    marketDemand: 'high' as const,
    averageYield: 42,
    imageUrl: '/images/wheat.jpg',
    description: 'रबी की मुख्य फसल, उत्तर भारत में मुख्यतः उगाई जाती है'
  },
  {
    id: '2',
    name: 'चना (Chickpea)',
    scientificName: 'Cicer arietinum',
    category: 'pulses' as CropCategory, // FIX: Explicit type cast
    season: 'rabi' as Season, // FIX: Explicit type cast
    duration: 100,
    soilTypes: ['loam', 'sandy'],
    waterRequirement: 'low' as WaterRequirement, // FIX: Explicit type cast
    climateRequirement: {
      minTemperature: 10,
      maxTemperature: 30,
      optimalTemperature: 20,
      minRainfall: 200,
      maxRainfall: 400,
      humidity: { min: 40, max: 60 },
      sunlightHours: 7
    },
    fertilizers: [],
    pests: [],
    diseases: [],
    marketDemand: 'medium' as const,
    averageYield: 22,
    imageUrl: '/images/chickpea.jpg',
    description: 'प्रोटीन युक्त दलहन फसल, कम पानी में उगती है'
  },
  {
    id: '3',
    name: 'धान (Rice)',
    scientificName: 'Oryza sativa',
    category: 'cereals' as CropCategory, // FIX: Explicit type cast
    season: 'kharif' as Season, // FIX: Explicit type cast
    duration: 140,
    soilTypes: ['clay', 'loam'],
    waterRequirement: 'high' as WaterRequirement, // FIX: Explicit type cast
    climateRequirement: {
      minTemperature: 22,
      maxTemperature: 32,
      optimalTemperature: 27,
      minRainfall: 1000,
      maxRainfall: 2000,
      humidity: { min: 70, max: 90 },
      sunlightHours: 5
    },
    fertilizers: [],
    pests: [],
    diseases: [],
    marketDemand: 'high' as const,
    averageYield: 55,
    imageUrl: '/images/rice.jpg',
    description: 'मुख्य खाद्यान्न फसल, अधिक पानी की आवश्यकता'
  }
];

export const mockPestDatabase = {
  aphids: {
    pestId: 'aphid-001',
    name: 'एफिड्स (Aphids)',
    scientificName: 'Myzus persicae',
    confidence: 0.85,
    severity: 'medium' as SeverityLevel, // FIX: Explicit type cast
    description: 'छोटे हरे कीड़े जो पत्तियों और तनों पर पाए जाते हैं',
    imageUrl: '/images/aphids.jpg',
    lifecycle: '15-20 दिन',
    damageSymptoms: ['पत्तियों का मुड़ना', 'चिपचिपा तरल (हनीड्यू)', 'पीली पत्तियां', 'विकास में बाधा'],
    favorableConditions: ['गर्म मौसम', 'नई पत्तियों की वृद्धि', 'उच्च नमी'],
    organicTreatments: [
      {
        id: 'neem-oil',
        name: 'नीम का तेल',
        type: 'organic' as const, // FIX: Explicit type cast to valid enum value
        activeIngredient: 'Azadirachtin',
        dosage: '5ml प्रति लीटर पानी',
        applicationMethod: 'पत्तियों पर छिड़काव',
        frequency: 'साप्ताहिक',
        timing: 'सुबह या शाम',
        cost: 50,
        effectiveness: 80,
        sideEffects: [],
        precautions: ['आंखों से बचाएं'],
        preharvestInterval: 0
      }
    ],
    chemicalTreatments: [],
    preventiveMeasures: ['नियमित निरीक्षण', 'संतुलित उर्वरक', 'लाभकारी कीड़ों को बढ़ावा']
  },
  fungus: {
    pestId: 'fungus-001',
    name: 'फफूंद रोग (Fungal Disease)',
    scientificName: 'Alternaria solani',
    confidence: 0.78,
    severity: 'high' as SeverityLevel, // FIX: Explicit type cast
    description: 'पत्तियों और फलों पर भूरे धब्बे बनाने वाला ففूंद रोग',
    imageUrl: '/images/fungus.jpg',
    lifecycle: '7-14 दिन',
    damageSymptoms: ['भूरे या काले धब्बे', 'पत्तियों का झड़ना', 'फलों पर सड़न', 'पौधे का मरना'],
    favorableConditions: ['उच्च नमी', 'गर्म तापमान', 'खराब वायु संचार'],
    organicTreatments: [
      {
        id: 'copper-sulfate',
        name: 'कॉपर सल्फेट',
        type: 'organic' as const, // FIX: Explicit type cast to valid enum value
        activeIngredient: 'Copper Sulfate',
        dosage: '2-3 ग्राम प्रति लीटर',
        applicationMethod: 'छिड़काव',
        frequency: '10-15 दिन में',
        timing: 'सुबह',
        cost: 80,
        effectiveness: 75,
        sideEffects: [],
        precautions: ['धातु के बर्तन में न मिलाएं'],
        preharvestInterval: 15
      }
    ],
    chemicalTreatments: [],
    preventiveMeasures: ['उचित दूरी बनाए रखें', 'हवादार खेती करें', 'संक्रमित भागों को हटाएं']
  }
};

export const mockWeatherAlerts = [
  {
    id: 'alert-1',
    type: 'heavy_rain' as const,
    severity: 'medium' as const,
    message: 'अगले 48 घंटों में भारी बारिश की संभावना। कीटनाशक छिड़काव टालें।',
    startTime: new Date(),
    endTime: new Date(Date.now() + 48 * 60 * 60 * 1000),
    affectedAreas: ['दिल्ली', 'गुरुग्राम', 'नोएडा'],
    recommendations: ['छिड़काव न करें', 'जल निकासी की व्यवस्था करें', 'फसल को सहारा दें']
  },
  {
    id: 'alert-2',
    type: 'heatwave' as const,
    severity: 'high' as const,
    message: 'तापमान 35°C से ऊपर जाने की संभावना। सिंचाई बढ़ाएं।',
    startTime: new Date(),
    endTime: new Date(Date.now() + 72 * 60 * 60 * 1000),
    affectedAreas: ['राजस्थान', 'हरियाणा', 'पंजाब'],
    recommendations: ['दिन में 2 बार सिंचाई करें', 'मल्चिंग करें', 'छायादार जगह बनाएं']
  }
];

export const mockFarmingTips = [
  {
    id: 'tip-1',
    category: 'सिंचाई (Irrigation)',
    tip: 'सुबह 6-8 बजे या शाम 4-6 बजे सिंचाई करें। दोपहर में पानी देने से बचें क्योंकि पानी का वाष्पीकरण अधिक होता है।',
    season: 'all',
    cropTypes: ['सभी फसलें'],
    importance: 'high',
    savings: 'पानी की 30% बचत'
  },
  {
    id: 'tip-2',
    category: 'बीज (Seeds)',
    tip: 'हमेशा प्रमाणित बीज का उपयोग करें। बुआई से पहले बीज उपचार जरूर करें। इससे रोग प्रतिरोधक क्षमता बढ़ती है।',
    season: 'all',
    cropTypes: ['अनाज', 'दलहन', 'तिलहन'],
    importance: 'high',
    savings: 'उत्पादन में 15-20% वृद्धि'
  },
  {
    id: 'tip-3',
    category: 'खाद (Fertilizer)',
    tip: 'जैविक खाद का प्राथमिकता से उपयोग करें। मिट्टी जांच के बाद ही रासायनिक खाद का प्रयोग करें।',
    season: 'all',
    cropTypes: ['सभी फसलें'],
    importance: 'medium',
    savings: 'खाद की लागत में 25% कमी'
  }
];

export const mockCommunityPosts = [
  {
    id: 'post-1',
    authorId: 'farmer-001',
    authorName: 'राजेश कुमार',
    authorImage: '/images/farmer1.jpg',
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      district: 'मेरठ',
      state: 'उत्तर प्रदेश',
      pincode: '250001'
    },
    title: 'गेहूं की फसल में पीली पत्ती की समस्या',
    content: 'मेरे गेहूं के खेत में पत्तियां पीली हो रही हैं। क्या यह खाद की कमी है या कोई रोग है? कृपया सुझाव दें।',
    images: ['/images/wheat-yellow.jpg'],
    category: 'question' as const,
    tags: ['गेहूं', 'पीली पत्ती', 'रोग'],
    likes: 15,
    views: 45,
    shares: 3,
    comments: [],
    verified: false,
    featured: false,
    status: 'published' as const,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    expertAnswered: true,
    solutionMarked: false
  },
  {
    id: 'post-2',
    authorId: 'farmer-002',
    authorName: 'सुनीता देवी',
    authorImage: '/images/farmer2.jpg',
    location: {
      latitude: 26.9124,
      longitude: 75.7873,
      district: 'जयपुर',
      state: 'राजस्थान',
      pincode: '302001'
    },
    title: 'जैविक खाद से बेहतर उत्पादन',
    content: 'इस साल मैंने गाय के गोबर से बनी खाद का उपयोग किया। टमाटर की फसल बहुत अच्छी हुई। सभी किसान भाइयों को सुझाव है।',
    images: ['/images/organic-tomato.jpg'],
    category: 'success_story' as const,
    tags: ['जैविक खाद', 'टमाटर', 'सफलता'],
    likes: 28,
    views: 89,
    shares: 12,
    comments: [],
    verified: true,
    featured: true,
    status: 'published' as const,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    expertAnswered: false,
    solutionMarked: false
  }
];
export const mockMarketPrices = [
  { crop: 'गेहूं (Wheat)', price: 2850, trend: 'up', market: 'Delhi Mandi', date: '2025-09-09', volume: 450 },
  { crop: 'चावल (Rice)', price: 3200, trend: 'stable', market: 'Mumbai APMC', date: '2025-09-09', volume: 380 },
  { crop: 'मक्का (Corn)', price: 1950, trend: 'down', market: 'Pune Mandi', date: '2025-09-09', volume: 290 },
  { crop: 'सोयाबीन (Soybean)', price: 4200, trend: 'up', market: 'Indore Mandi', date: '2025-09-09', volume: 220 },
  { crop: 'कपास (Cotton)', price: 6800, trend: 'up', market: 'Nagpur APMC', date: '2025-09-09', volume: 180 },
  { crop: 'गन्ना (Sugarcane)', price: 3800, trend: 'stable', market: 'Lucknow Mandi', date: '2025-09-09', volume: 320 }
];