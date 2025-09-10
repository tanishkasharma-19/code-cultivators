import { Crop, CropRecommendationParams } from '../types';

export class CropService {
  async getRecommendedCrops(params: CropRecommendationParams): Promise<Crop[]> {
    // Mock implementation for now
    console.log('Getting crop recommendations for:', params);
    return [];
  }

  async getCropDetails(cropId: string): Promise<Crop | null> {
    console.log('Getting crop details for:', cropId);
    return null;
  }
}
