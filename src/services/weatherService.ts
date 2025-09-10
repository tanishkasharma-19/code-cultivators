import { WeatherData, WeatherForecast } from '../types';

export class WeatherService {
  private apiKey: string;
  private baseURL = 'https://api.openweathermap.org/data/2.5';

  constructor(apiKey: string) {
    this.apiKey = 'ec86395d68b26c359e8f5be368692f49';
    console.log('🔑 Weather API Key:', this.apiKey ? 'Present' : 'Missing'); // Debug log
  }

  async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    try {
      const url = `${this.baseURL}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
      console.log('🌐 Fetching weather from:', url); // Debug log
      
      const response = await fetch(url);
      
      console.log('📡 Response status:', response.status, response.statusText); // Debug log
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error Response:', errorText); // Debug log
        throw new Error(`Weather API error: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('✅ Weather data received:', data); // Debug log
      
      return this.transformWeatherData(data, lat, lon);
    } catch (error) {
      console.error('🚨 Weather fetch error:', error); // Debug log
      throw new Error(`Failed to fetch weather data: ${error}`);
    }
  }

  async getWeatherForecast(lat: number, lon: number): Promise<WeatherData> {
    try {
      const url = `${this.baseURL}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Forecast API error: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      return this.transformForecastData(data, lat, lon);
    } catch (error) {
      console.error('Forecast fetch error:', error);
      throw new Error(`Failed to fetch forecast data: ${error}`);
    }
  }

  private transformWeatherData(data: any, lat: number, lon: number): WeatherData {
    return {
      id: `weather-${Date.now()}`,
      location: {
        latitude: lat,
        longitude: lon,
        district: data.name || 'Unknown',
        state: data.sys?.country || 'Unknown',
        pincode: '000000'
      },
      timestamp: new Date(),
      temperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      rainfall: data.rain?.['1h'] || 0,
      windSpeed: data.wind?.speed || 0,
      windDirection: data.wind?.deg || 0,
      pressure: data.main.pressure,
      uvIndex: 0,
      visibility: (data.visibility || 10000) / 1000,
      forecast: []
    };
  }

  private transformForecastData(data: any, lat: number, lon: number): WeatherData {
    const forecast: WeatherForecast[] = data.list.slice(0, 7).map((item: any) => ({
      date: new Date(item.dt * 1000),
      temperature: {
        min: Math.round(item.main.temp_min),
        max: Math.round(item.main.temp_max),
        average: Math.round(item.main.temp)
      },
      humidity: item.main.humidity,
      rainfall: item.rain?.['3h'] || 0,
      windSpeed: item.wind?.speed || 0,
      description: item.weather[0]?.description || 'Clear',
      icon: item.weather[0]?.icon || '01d',
      alerts: []
    }));

    return {
      id: `forecast-${Date.now()}`,
      location: {
        latitude: lat,
        longitude: lon,
        district: data.city?.name || 'Unknown',
        state: data.city?.country || 'Unknown',
        pincode: '000000'
      },
      timestamp: new Date(),
      temperature: Math.round(data.list[0]?.main.temp || 0),
      humidity: data.list[0]?.main.humidity || 0,
      rainfall: data.list[0]?.rain?.['3h'] || 0,
      windSpeed: data.list[0]?.wind?.speed || 0,
      windDirection: data.list[0]?.wind?.deg || 0,
      pressure: data.list[0]?.main.pressure || 1013,
      uvIndex: 0,
      visibility: 10,
      forecast
    };
  }
}
