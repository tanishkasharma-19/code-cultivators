import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Headers
      "pest_detection_title": "AI Pest Detection",
      "pest_detection_subtitle": "Upload plant images and let AI identify pests",
      
      // Upload Section
      "upload_image_title": "Upload Plant Image",
      "upload_instructions": "Take a clear photo of affected leaves, stems, or the pest itself",
      "choose_file": "📁 Choose Image File",
      "take_photo": "📸 Take Photo",
      "supported_formats": "Supported formats: JPG, PNG, HEIC (Max size: 5MB)",
      
      // Detection
      "analyze_button": "🤖 Analyze with AI",
      "analyzing": "Analyzing with AI...",
      
      // Results
      "detection_results": "🎯 Detection Results",
      "detected_pest": "Detected:",
      "confidence": "Confidence:",
      "risk_level": "Risk Level:",
      "high_risk": "HIGH",
      "medium_risk": "MEDIUM", 
      "low_risk": "LOW",
      "treatment_recommendations": "💊 Treatment Recommendations:",
      
      // Action Buttons
      "contact_expert": "📞 Contact Expert",
      "buy_medicine": "🛒 Buy Treatment",
      "share_community": "📱 Share with Community",
      "save_report": "💾 Save Report",
      
      // Tips
      "photography_tips": "💡 Photography Tips for Better Detection",
      "tip_1": "• Take photos in good natural light",
      "tip_2": "• Focus on affected leaves or plant parts", 
      "tip_3": "• Include multiple angles if possible",
      "tip_4": "• Avoid blurry or dark images",
      
      // Language Toggle
      "language": "Language",
      "english": "English",
      "hindi": "हिंदी"
    }
  },
  hi: {
    translation: {
      // Headers
      "pest_detection_title": "AI पेस्ट डिटेक्शन",
      "pest_detection_subtitle": "अपने पौधे की तस्वीर अपलोड करें और AI से कीट की पहचान कराएं",
      
      // Upload Section
      "upload_image_title": "पौधे की तस्वीर अपलोड करें",
      "upload_instructions": "प्रभावित पत्तियों, तनों, या कीट की साफ तस्वीर लें",
      "choose_file": "📁 फ़ाइल चुनें",
      "take_photo": "📸 तस्वीर लें",
      "supported_formats": "समर्थित फॉर्मेट: JPG, PNG, HEIC (अधिकतम साइज़: 5MB)",
      
      // Detection
      "analyze_button": "🤖 AI से विश्लेषण करें",
      "analyzing": "AI विश्लेषण कर रहा है...",
      
      // Results
      "detection_results": "🎯 पहचान परिणाम",
      "detected_pest": "पहचाना गया:",
      "confidence": "विश्वास स्तर:",
      "risk_level": "जोखिम स्तर:",
      "high_risk": "उच्च",
      "medium_risk": "मध्यम",
      "low_risk": "कम",
      "treatment_recommendations": "💊 उपचार की सिफारिश:",
      
      // Action Buttons
      "contact_expert": "📞 विशेषज्ञ से संपर्क करें",
      "buy_medicine": "🛒 उपचार खरीदें",
      "share_community": "📱 समुदाय में साझा करें", 
      "save_report": "💾 रिपोर्ट सहेजें",
      
      // Tips
      "photography_tips": "💡 बेहतर पहचान के लिए फोटोग्राफी टिप्स",
      "tip_1": "• अच्छी प्राकृतिक रोशनी में तस्वीर लें",
      "tip_2": "• प्रभावित पत्तियों या पौधे के हिस्सों पर फोकस करें",
      "tip_3": "• संभव हो तो कई कोणों से तस्वीर लें",
      "tip_4": "• धुंधली या अंधेरी तस्वीरों से बचें",
      
      // Language Toggle
      "language": "भाषा",
      "english": "English",
      "hindi": "हिंदी"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
