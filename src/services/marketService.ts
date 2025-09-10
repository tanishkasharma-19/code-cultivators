import { MarketPrice, Location } from '../types';

export class MarketService {
  async getPricesForCrops(crops: string[], location: Location): Promise<MarketPrice[]> {
    console.log('Getting prices for crops:', crops, 'at location:', location);
    return [];
  }

  async getCurrentPrices(location: Location): Promise<MarketPrice[]> {
    console.log('Getting current prices for location:', location);
    return [];
  }
}
