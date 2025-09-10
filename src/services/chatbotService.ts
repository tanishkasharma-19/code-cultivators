import { ChatbotResponse } from '../types';
import { DemoService } from './demoService';

export class ChatbotService {
  private demoService = new DemoService();

  async getResponse(message: string, language: string): Promise<ChatbotResponse> {
    const responseText = await this.demoService.getChatbotResponse(message, language as 'hi' | 'en');
    
    const suggestions = language === 'hi' 
      ? ['मौसम की जानकारी', 'फसल की कीमत', 'कीट नियंत्रण', 'खाद की सलाह']
      : ['Weather update', 'Crop prices', 'Pest control', 'Fertilizer advice'];

    return {
      text: responseText,
      suggestions,
      actionButtons: [],
      confidence: 0.9,
      intent: 'agricultural_query',
      entities: [],
      followUpQuestions: language === 'hi' 
        ? ['और कोई सवाल?', 'मदद चाहिए?'] 
        : ['Any other questions?', 'Need more help?']
    };
  }
}
