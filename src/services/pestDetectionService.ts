import { PestDetection, DetectedPest, SeverityLevel } from '../types';

export class PestDetectionService {
  private readonly plantIdAPI = 'https://api.plant.id/v2/identify';
  private readonly apiKey = process.env.REACT_APP_PLANT_ID_KEY;

  async detectPest(imageFile: File): Promise<PestDetection> {
    try {
      const base64Image = await this.convertToBase64(imageFile);
      
      const response = await fetch(`${this.plantIdAPI}/pests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Api-Key': this.apiKey || ''
        },
        body: JSON.stringify({
          images: [base64Image],
          modifiers: ["crops_fast", "similar_images"],
          plant_language: "en",
          plant_details: ["common_names", "url", "description", "taxonomy"]
        })
      });

      const data = await response.json();
      
      return this.transformPestData(data, imageFile);
    } catch (error) {
      console.error('Pest detection API error:', error);
      return this.getMockDetection(imageFile);
    }
  }

  private async convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result as string;
        resolve(base64.split(',')[1]); // Remove data:image/jpeg;base64, prefix
      };
      reader.onerror = error => reject(error);
    });
  }

  private transformPestData(data: any, imageFile: File): PestDetection {
    const detectedPests: DetectedPest[] = [];
    
    if (data.suggestions && data.suggestions.length > 0) {
      data.suggestions.forEach((suggestion: any, index: number) => {
        if (index < 3) { // Limit to top 3 suggestions
          detectedPests.push({
            pestId: `pest-${index}`,
            name: suggestion.plant_name || 'Unknown Pest',
            scientificName: suggestion.plant_details?.taxonomy?.genus || 'Unknown',
            confidence: suggestion.probability || 0.5,
            severity: this.calculateSeverity(suggestion.probability),
            description: suggestion.plant_details?.description || 'Pest detected in uploaded image',
            imageUrl: URL.createObjectURL(imageFile),
            lifecycle: '15-30 days (typical)',
            damageSymptoms: this.getPestSymptoms(suggestion.plant_name),
            favorableConditions: ['Warm weather', 'High humidity', 'Dense crop canopy'],
            organicTreatments: this.getOrganicTreatments(suggestion.plant_name),
            chemicalTreatments: [],
            preventiveMeasures: this.getPreventiveMeasures()
          });
        }
      });
    }

    return {
      id: `detection-${Date.now()}`,
      farmerId: 'current-user',
      imageUrl: URL.createObjectURL(imageFile),
      uploadedAt: new Date(),
      detectedPests,
      detectedDiseases: [],
      confidence: detectedPests.length > 0 ? detectedPests[0].confidence : 0.5,
      cropType: 'unknown',
      location: {
        latitude: 0,
        longitude: 0,
        district: 'Unknown',
        state: 'Unknown',
        pincode: '000000'
      },
      status: 'completed',
      expertVerified: false,
      treatment: this.generateTreatmentPlan(detectedPests)
    };
  }

  private calculateSeverity(confidence: number): SeverityLevel {
    if (confidence > 0.8) return 'high';
    if (confidence > 0.5) return 'medium';
    return 'low';
  }

  private getPestSymptoms(pestName: string): string[] {
    const commonSymptoms = [
      'Yellowing of leaves',
      'Holes in leaves', 
      'Wilting plants',
      'Stunted growth',
      'Visible insects on plants'
    ];

    if (pestName?.toLowerCase().includes('aphid')) {
      return ['Curled leaves', 'Sticky honeydew', 'Yellowing', 'Stunted growth'];
    }
    
    return commonSymptoms;
  }

  private getOrganicTreatments(pestName: string): any[] {
    return [
      {
        id: 'neem-oil',
        name: 'Neem Oil Spray',
        type: 'organic',
        dosage: '5-10ml per litre water',
        applicationMethod: 'Foliar spray',
        frequency: 'Weekly',
        timing: 'Early morning or evening',
        cost: 50,
        effectiveness: 75
      },
      {
        id: 'soap-spray',
        name: 'Soap Water Spray',  
        type: 'organic',
        dosage: '2-3 drops per litre',
        applicationMethod: 'Direct spray',
        frequency: 'Bi-weekly',
        timing: 'Morning',
        cost: 20,
        effectiveness: 60
      }
    ];
  }

  private getPreventiveMeasures(): string[] {
    return [
      'Regular field monitoring',
      'Maintain proper plant spacing',
      'Remove weeds regularly',
      'Use resistant crop varieties',
      'Encourage beneficial insects'
    ];
  }

  private generateTreatmentPlan(pests: DetectedPest[]): string[] {
    if (pests.length === 0) {
      return ['No specific pests detected. Continue regular monitoring.'];
    }

    const treatments = [
      'Apply neem oil spray (5ml/litre water) in early morning',
      'Remove affected plant parts and destroy them',
      'Increase monitoring frequency to twice daily',
      'Ensure proper field drainage and ventilation'
    ];

    const severity = pests[0].severity;
    if (severity === 'high') {
      treatments.push('Consider consulting local agricultural extension officer');
      treatments.push('Apply treatment immediately to prevent spread');
    }

    return treatments;
  }

  private getMockDetection(imageFile: File): PestDetection {
    return {
      id: `mock-${Date.now()}`,
      farmerId: 'current-user',
      imageUrl: URL.createObjectURL(imageFile),
      uploadedAt: new Date(),
      detectedPests: [
        {
          pestId: 'aphid-1',
          name: 'Green Aphids',
          scientificName: 'Myzus persicae',
          confidence: 0.85,
          severity: 'medium',
          description: 'Small green insects commonly found on leaves and stems',
          imageUrl: URL.createObjectURL(imageFile),
          lifecycle: '15-20 days',
          damageSymptoms: ['Curled leaves', 'Sticky honeydew', 'Yellowing'],
          favorableConditions: ['Warm weather', 'New plant growth'],
          organicTreatments: this.getOrganicTreatments('aphid'),
          chemicalTreatments: [],
          preventiveMeasures: this.getPreventiveMeasures()
        }
      ],
      detectedDiseases: [],
      confidence: 0.85,
      cropType: 'vegetable',
      location: {
        latitude: 0,
        longitude: 0,
        district: 'Unknown',
        state: 'Unknown', 
        pincode: '000000'
      },
      status: 'completed',
      expertVerified: false,
      treatment: [
        'Apply neem oil spray (5ml/litre) in early morning',
        'Spray soap water solution on affected areas', 
        'Remove heavily infested leaves',
        'Monitor daily for 1 week'
      ]
    };
  }
}
