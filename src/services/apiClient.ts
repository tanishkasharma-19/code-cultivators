class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }
}

export const weatherAPI = new ApiClient('https://api.openweathermap.org/data/2.5');
export const agricultureAPI = new ApiClient('https://api.data.gov.in/resource');
export const translateAPI = new ApiClient('https://translation.googleapis.com/language/translate/v2');
