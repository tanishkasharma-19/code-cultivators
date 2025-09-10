// ==================== CORE USER TYPES ====================
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  verified: boolean;
  createdAt: Date;
  language: string;
  role: 'farmer' | 'buyer' | 'expert' | 'admin';
}

export interface Farmer extends User {
  farmDetails: FarmDetails;
  subscriptionPlan: 'basic' | 'premium' | 'enterprise';
  expertiseLevel: 'beginner' | 'intermediate' | 'expert';
  preferredCrops: string[];
  totalExperience: number; // years
}

export interface Location {
  latitude: number;
  longitude: number;
  district: string;
  state: string;
  pincode: string;
  village?: string;
  taluka?: string;
}

export interface FarmDetails {
  id: string;
  farmerId: string;
  name: string;
  totalArea: number; // in acres
  location: Location;
  soilType: SoilType;
  waterSource: WaterSource[];
  irrigationType: IrrigationType;
  fields: Field[];
  registeredAt: Date;
}

// ==================== AGRICULTURE CORE TYPES ====================
export interface Crop {
  id: string;
  name: string;
  scientificName: string;
  category: CropCategory;
  season: Season;
  duration: number; // days
  soilTypes: SoilType[];
  waterRequirement: WaterRequirement;
  climateRequirement: ClimateRequirement;
  fertilizers: Fertilizer[];
  pests: CommonPest[];
  diseases: CommonDisease[];
  marketDemand: 'high' | 'medium' | 'low';
  averageYield: number; // per acre
  imageUrl: string;
  description: string;
}

export interface Field {
  id: string;
  farmId: string;
  name: string;
  area: number; // acres
  soilData: SoilData;
  currentCrop?: CropCycle;
  cropHistory: CropCycle[];
  location: Location;
  irrigationSchedule: IrrigationSchedule[];
  lastSoilTest: Date;
}

export interface CropCycle {
  id: string;
  fieldId: string;
  cropId: string;
  cropName: string;
  plantingDate: Date;
  harvestDate: Date;
  expectedYield: number;
  actualYield?: number;
  status: CropStatus;
  growthStage: GrowthStage;
  activities: FarmActivity[];
  expenses: CropExpense[];
  revenue?: number;
  notes: string;
}

// ==================== SOIL & ENVIRONMENTAL TYPES ====================
export interface SoilData {
  id: string;
  fieldId: string;
  ph: number;
  nitrogen: number; // ppm
  phosphorus: number; // ppm
  potassium: number; // ppm
  organicMatter: number; // percentage
  moisture: number; // percentage
  temperature: number; // celsius
  ec: number; // electrical conductivity
  soilType: SoilType;
  testDate: Date;
  recommendations: SoilRecommendation[];
  nextTestDue: Date;
}

export interface SoilRecommendation {
  id: string;
  parameter: string;
  currentValue: number;
  recommendedValue: number;
  action: string;
  priority: 'high' | 'medium' | 'low';
  estimatedCost: number;
}

export interface WeatherData {
  id: string;
  location: Location;
  timestamp: Date;
  temperature: number; // celsius
  humidity: number; // percentage
  rainfall: number; // mm
  windSpeed: number; // m/s
  windDirection: number; // degrees
  pressure: number; // hPa
  uvIndex: number;
  visibility: number; // km
  forecast: WeatherForecast[];
}

export interface WeatherForecast {
  date: Date;
  temperature: {
    min: number;
    max: number;
    average: number;
  };
  humidity: number;
  rainfall: number;
  windSpeed: number;
  description: string;
  icon: string;
  alerts: WeatherAlert[];
}

export interface WeatherAlert {
  id: string;
  type: WeatherAlertType;
  severity: 'low' | 'medium' | 'high' | 'extreme';
  message: string;
  startTime: Date;
  endTime: Date;
  affectedAreas: string[];
  recommendations: string[];
}

// ==================== PEST & DISEASE TYPES ====================
export interface PestDetection {
  id: string;
  farmerId: string;
  imageUrl: string;
  uploadedAt: Date;
  detectedPests: DetectedPest[];
  detectedDiseases: DetectedDisease[];
  confidence: number; // 0-1
  cropType: string;
  location: Location;
  status: 'analyzing' | 'completed' | 'failed';
  expertVerified: boolean;
  treatment: string[]; // Fixed: changed from treatments to treatment
}

export interface DetectedPest {
  pestId: string;
  name: string;
  scientificName: string;
  confidence: number;
  severity: SeverityLevel;
  description: string;
  imageUrl: string;
  lifecycle: string;
  damageSymptoms: string[];
  favorableConditions: string[];
  organicTreatments: Treatment[];
  chemicalTreatments: Treatment[];
  preventiveMeasures: string[];
}

export interface DetectedDisease {
  diseaseId: string;
  name: string;
  scientificName: string;
  confidence: number;
  severity: SeverityLevel;
  description: string;
  causativeAgent: 'fungal' | 'bacterial' | 'viral' | 'nutritional';
  symptoms: string[];
  spreadPattern: string;
  treatments: Treatment[];
  preventiveMeasures: string[];
}

export interface Treatment {
  id: string;
  name: string;
  type: 'organic' | 'chemical' | 'biological' | 'cultural';
  activeIngredient?: string;
  dosage: string;
  applicationMethod: string;
  frequency: string;
  timing: string;
  cost: number;
  effectiveness: number; // percentage
  sideEffects: string[];
  precautions: string[];
  preharvestInterval: number; // days - Fixed: removed space
}

// ==================== MARKET & TRADING TYPES ====================
export interface MarketPrice {
  id: string;
  crop: string;
  variety?: string;
  price: number; // per unit
  unit: string;
  market: string;
  marketType: 'mandi' | 'wholesale' | 'retail' | 'online';
  location: Location;
  date: Date;
  trend: PriceTrend;
  volume: number; // quantity traded
  quality: QualityGrade;
  source: 'government' | 'private' | 'user_reported';
  verified: boolean;
}

export interface PriceTrend {
  direction: 'up' | 'down' | 'stable';
  percentage: number;
  period: 'daily' | 'weekly' | 'monthly';
}

export interface ProduceListing {
  id: string;
  sellerId: string;
  sellerName: string;
  crop: string;
  variety: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalPrice: number;
  quality: QualityGrade;
  organic: boolean;
  certified: boolean;
  harvestDate: Date;
  expiryDate: Date;
  location: Location;
  description: string;
  images: string[];
  status: ListingStatus;
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
  inquiries: Inquiry[];
  ratings: Rating[];
  minimumOrder: number;
  packaging: string;
  deliveryOptions: DeliveryOption[];
}

export interface Inquiry {
  id: string;
  listingId: string;
  buyerId: string;
  buyerName: string;
  message: string;
  requestedQuantity: number;
  proposedPrice?: number;
  contactInfo: ContactInfo;
  status: InquiryStatus;
  createdAt: Date;
  responses: InquiryResponse[];
}

export interface InquiryResponse {
  id: string;
  inquiryId: string;
  responderId: string;
  responderType: 'seller' | 'buyer';
  message: string;
  acceptedPrice?: number;
  acceptedQuantity?: number;
  createdAt: Date;
}

// ==================== COMMUNITY TYPES ====================
export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorImage?: string;
  location: Location;
  title: string;
  content: string;
  images: string[];
  category: PostCategory;
  tags: string[];
  likes: number;
  views: number;
  shares: number;
  comments: Comment[];
  verified: boolean;
  featured: boolean;
  status: PostStatus;
  createdAt: Date;
  updatedAt: Date;
  expertAnswered: boolean;
  solutionMarked: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorImage?: string;
  content: string;
  images?: string[];
  likes: number;
  replies: Reply[];
  isExpert: boolean;
  isSolution: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Reply {
  id: string;
  commentId: string;
  authorId: string;
  authorName: string;
  content: string;
  likes: number;
  createdAt: Date;
}

// ==================== DASHBOARD & ANALYTICS TYPES ====================
export interface FarmMetrics {
  farmId: string;
  date: Date;
  totalArea: number;
  cultivatedArea: number;
  activeFields: number;
  currentCrops: number;
  totalInvestment: number;
  expectedRevenue: number;
  actualRevenue: number;
  profitMargin: number;
  waterUsage: number;
  fertilizerUsage: number; // Fixed: removed space
  pesticideUsage: number;
  laborHours: number;
  machineryUsage: number;
  yieldPerAcre: number;
  qualityScore: number;
  sustainabilityScore: number;
}

export interface FarmActivity {
  id: string;
  fieldId: string;
  cropCycleId: string;
  activity: ActivityType;
  description: string;
  date: Date;
  duration: number; // hours
  cost: number;
  laborRequired: number;
  machineryUsed: string[];
  materialsUsed: Material[];
  weatherCondition: string;
  notes: string;
  photos: string[];
  completedBy: string;
  status: ActivityStatus;
  nextActivity?: string;
  reminderSet: boolean;
}

export interface CropExpense {
  id: string;
  cropCycleId: string;
  category: ExpenseCategory;
  subcategory: string;
  amount: number;
  description: string;
  date: Date;
  vendor?: string;
  paymentMethod: PaymentMethod;
  receipt?: string;
  taxAmount?: number;
  notes?: string;
}

export interface Material {
  id: string;
  name: string;
  category: MaterialCategory;
  quantity: number;
  unit: string;
  costPerUnit: number;
  totalCost: number;
  supplier: string;
  batchNumber?: string;
  expiryDate?: Date;
  organicCertified: boolean;
}

// ==================== CHATBOT & AI TYPES ====================
export interface ChatMessage {
  id: string;
  conversationId?: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  messageType?: MessageType;
  attachments?: Attachment[];
  suggestions?: string[];
  actionButtons?: ActionButton[];
  confidence?: number;
  language?: string;
  translated?: boolean;
  originalText?: string;
}

export interface ChatbotResponse {
  text: string;
  suggestions: string[];
  actionButtons: ActionButton[];
  confidence: number;
  intent: string;
  entities: ExtractedEntity[];
  followUpQuestions: string[];
}

export interface ExtractedEntity {
  entity: string;
  value: string;
  confidence: number;
  start: number;
  end: number;
}

export interface ActionButton {
  id: string;
  label: string;
  action: string;
  payload: any;
  style: 'primary' | 'secondary' | 'danger';
}

// ==================== ANALYTICS TYPES ====================
export interface FarmAnalytics {
  farmId: string;
  period: 'daily' | 'weekly' | 'monthly' | 'seasonal' | 'yearly';
  metrics: {
    totalRevenue: number;
    totalCosts: number;
    profit: number;
    roi: number;
    yieldPerAcre: number;
    costPerAcre: number;
    waterEfficiency: number;
    laborProductivity: number;
    cropSuccessRate: number; // Fixed: removed space
  };
  trends: {
    revenue: TrendData[];
    costs: TrendData[];
    yield: TrendData[];
    efficiency: TrendData[];
  };
  comparisons: {
    previousPeriod: number;
    seasonalAverage: number;
    regionalAverage: number;
    benchmarks: BenchmarkData[];
  };
}

export interface TrendData {
  date: Date;
  value: number;
  change: number;
  percentage: number;
}

export interface BenchmarkData {
  metric: string;
  farmValue: number;
  regionAverage: number;
  bestPractice: number;
  recommendations: string[];
}

export interface IrrigationSchedule {
  id: string;
  fieldId: string;
  cropId: string;
  startDate: Date;
  endDate: Date;
  frequency: number; // days
  duration: number; // minutes
  waterAmount: number; // liters
  method: IrrigationType;
  timeOfDay: string;
  weatherDependent: boolean;
  soilMoistureThreshold: number;
  automated: boolean;
  nextScheduled: Date;
  status: 'active' | 'paused' | 'completed';
  completedSessions: IrrigationSession[];
}

export interface IrrigationSession {
  id: string;
  scheduleId: string;
  date: Date;
  plannedDuration: number;
  actualDuration: number;
  waterUsed: number;
  soilMoistureBefore: number;
  soilMoistureAfter: number;
  weatherCondition: string;
  notes?: string;
  efficiency: number;
}

// ==================== ENUMS & CONSTANTS ====================
export type SoilType = 
  | 'clay' 
  | 'sandy' 
  | 'loam' 
  | 'silt' 
  | 'chalky' 
  | 'peat' 
  | 'saline' 
  | 'alkaline';

export type Season = 'kharif' | 'rabi' | 'zaid';

export type CropCategory = 
  | 'cereals' 
  | 'pulses' 
  | 'vegetables' 
  | 'fruits' 
  | 'spices' 
  | 'cash_crops' 
  | 'fodder' 
  | 'flowers';

export type WaterRequirement = 'low' | 'medium' | 'high' | 'very_high';

export type IrrigationType = 
  | 'flood' 
  | 'sprinkler' 
  | 'drip' 
  | 'furrow' 
  | 'basin' 
  | 'border' 
  | 'micro_sprinkler';

export type WaterSource = 
  | 'borewell' 
  | 'canal' 
  | 'river' 
  | 'pond' 
  | 'rainwater' 
  | 'tube_well' 
  | 'open_well';

export type CropStatus = 
  | 'planned' 
  | 'planted' 
  | 'growing' 
  | 'flowering' 
  | 'fruiting' 
  | 'matured' 
  | 'harvested' 
  | 'failed';

export type GrowthStage = 
  | 'seed' 
  | 'germination' 
  | 'seedling' 
  | 'vegetative' 
  | 'flowering' 
  | 'fruiting' 
  | 'maturity' 
  | 'harvest';

export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

export type QualityGrade = 'Premium' | 'Grade A' | 'Grade B' | 'Grade C';

export type ListingStatus = 
  | 'active' 
  | 'sold' 
  | 'expired' 
  | 'paused' 
  | 'rejected' 
  | 'pending_approval';

export type InquiryStatus = 
  | 'new' 
  | 'responded' 
  | 'negotiating' 
  | 'accepted' 
  | 'rejected' 
  | 'completed';

export type PostCategory = 
  | 'question' 
  | 'success_story' 
  | 'alert' 
  | 'tip' 
  | 'news' 
  | 'discussion' 
  | 'help_needed';

export type PostStatus = 
  | 'draft' 
  | 'published' 
  | 'archived' 
  | 'reported' 
  | 'removed';

export type ActivityType = 
  | 'planting' 
  | 'watering' 
  | 'fertilizing' 
  | 'spraying' 
  | 'weeding' 
  | 'harvesting' 
  | 'pruning' 
  | 'soil_testing';

export type ActivityStatus = 
  | 'planned' 
  | 'in_progress' 
  | 'completed' 
  | 'skipped' 
  | 'overdue';

export type ExpenseCategory = 
  | 'seeds' 
  | 'fertilizers' 
  | 'pesticides' 
  | 'labor' 
  | 'machinery' 
  | 'fuel' 
  | 'irrigation' 
  | 'transportation' 
  | 'storage' 
  | 'other';

export type MaterialCategory = 
  | 'seed' 
  | 'fertilizer' 
  | 'pesticide' 
  | 'herbicide' 
  | 'growth_regulator' 
  | 'soil_amendment';

export type PaymentMethod = 
  | 'cash' 
  | 'bank_transfer' 
  | 'upi' 
  | 'cheque' 
  | 'credit_card' 
  | 'debit_card';

export type MessageType = 
  | 'text' 
  | 'image' 
  | 'voice' 
  | 'quick_reply' 
  | 'attachment';

export type VoiceIntent = 
  | 'weather_query' 
  | 'crop_advice' 
  | 'market_prices' 
  | 'pest_identification' 
  | 'irrigation_control' 
  | 'navigation' 
  | 'reminder' 
  | 'emergency';

export type NotificationType = 
  | 'weather_alert' 
  | 'irrigation_reminder' 
  | 'pest_warning' 
  | 'market_price' 
  | 'task_reminder' 
  | 'community_post' 
  | 'system_update';

export type NotificationChannel = 'push' | 'sms' | 'email' | 'voice' | 'whatsapp';

export type NotificationCategory = 
  | 'urgent' 
  | 'agricultural' 
  | 'social' 
  | 'financial' 
  | 'system' 
  | 'promotional';

export type WeatherAlertType = 
  | 'heavy_rain' 
  | 'drought' 
  | 'heatwave' 
  | 'frost' 
  | 'hail' 
  | 'cyclone' 
  | 'fog';

export type ClimateRequirement = {
  minTemperature: number;
  maxTemperature: number;
  optimalTemperature: number;
  minRainfall: number;
  maxRainfall: number;
  humidity: {
    min: number;
    max: number;
  };
  sunlightHours: number;
};

export type CommonPest = {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  imageUrl: string;
  damageType: string;
  seasonality: Season[];
  treatmentMethods: string[];
};

export type CommonDisease = {
  id: string;
  name: string;
  scientificName: string;
  causativeAgent: string;
  symptoms: string[];
  treatmentMethods: string[];
  preventiveMeasures: string[];
};

export type Fertilizer = {
  id: string;
  name: string;
  type: 'organic' | 'inorganic' | 'bio';
  npkRatio: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
  };
  applicationRate: number;
  applicationMethod: string;
  timing: string[];
  cost: number;
};

export type DeliveryOption = {
  id: string;
  method: string;
  cost: number;
  estimatedDays: number;
  available: boolean;
  restrictions?: string[];
};

export type ContactInfo = {
  phone: string;
  email?: string;
  whatsapp?: string;
  address?: string;
  preferredContact: 'phone' | 'email' | 'whatsapp';
};

export type Rating = {
  id: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  review: string;
  date: Date;
  verified: boolean;
  helpful: number;
};

export type Attachment = {
  id: string;
  type: 'image' | 'document' | 'audio' | 'video';
  url: string;
  filename: string;
  size: number;
  mimeType: string;
  uploadedAt: Date;
};

// ==================== API RESPONSE TYPES ====================
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  errors?: string[];
  pagination?: PaginationInfo;
  timestamp: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface FilterOptions {
  category?: string;
  location?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  dateRange?: {
    start: Date;
    end: Date;
  };
  quality?: QualityGrade;
  organic?: boolean;
  sortBy?: 'price' | 'date' | 'distance' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}
// Add this interface in the types file
export interface CropRecommendationParams {
  location: Location;
  soilData?: SoilData;
  season: Season;
  farmSize: number;
  waterAvailability: WaterRequirement;
  budget?: number;
  experience?: string;
  preferences?: CropPreferences;
}

export interface CropPreferences {
  organic: boolean;
  shortDuration: boolean;
  highYield: boolean;
  lowMaintenance: boolean;
  cashCrop: boolean;
  marketDemand: boolean;
}
