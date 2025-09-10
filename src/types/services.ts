import {
  WeatherData,
  WeatherForecast,
  WeatherAlert,
  WeatherAlertType,
  Crop,
  Field,
  PestDetection,
  DetectedDisease,
  Treatment,
  MarketPrice,
  CommunityPost,
  Comment,
  Location,
  SoilData,
  Season,
  WaterRequirement,
  ActivityType,
  GrowthStage,
  SeverityLevel,
  PostCategory,
  ContactInfo
} from './index';

// Rest of your services.ts content stays the same...
export interface WeatherServiceInterface {
  getCurrentWeather(lat: number, lon: number): Promise<WeatherData>;
  getWeatherForecast(lat: number, lon: number, days?: number): Promise<WeatherForecast[]>;
  getWeatherAlerts(location: Location): Promise<WeatherAlert[]>;
  subscribeToAlerts(userId: string, alertTypes: WeatherAlertType[]): Promise<boolean>;
}

// ... rest of interfaces
