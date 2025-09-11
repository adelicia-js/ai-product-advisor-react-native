import axios from 'axios';
import { Product, AIResponse, AIRecommendation } from '../types';
import { PRODUCT_CATALOG } from '../data/skus';

// You'll need to add your Gemini API key here
const GEMINI_API_KEY = 'AIzaSyDu6vNC3irtM7Gv1806oNYqHCQPXpWE8Yw';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// Simple in-memory cache for API responses
const responseCache = new Map<string, { response: AIResponse; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export class AIService {
  static async getRecommendations(userQuery: string): Promise<AIResponse> {
    // Check cache first
    const cacheKey = userQuery.toLowerCase().trim();
    const cached = responseCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log('Returning cached response for:', cacheKey);
      return cached.response;
    }
    
    const prompt = this.createPrompt(userQuery, PRODUCT_CATALOG);
    
    try {
      const response = await axios.post(GEMINI_API_URL, {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 1,
          topP: 1,
          maxOutputTokens: 1024, // Reduced for faster response
        },
      });

      const aiText = response.data.candidates[0].content.parts[0].text;
      const aiResponse = this.parseAIResponse(aiText);
      
      // Cache the successful response
      responseCache.set(cacheKey, {
        response: aiResponse,
        timestamp: Date.now()
      });
      
      // Clean old cache entries
      if (responseCache.size > 20) {
        const firstKey = responseCache.keys().next().value;
        responseCache.delete(firstKey);
      }
      
      return aiResponse;
    } catch (error: any) {
      console.error('AI Service Error:', error.response?.data || error.message);
      
      // Fallback to mock recommendations if API fails
      console.log('Falling back to mock recommendations due to API error');
      return this.getMockRecommendations(userQuery);
    }
  }

  private static createPrompt(userQuery: string, products: Product[]): string {
    const productList = products.map((p) => ({
      id: p.id,
      name: p.product_name,
      brand: p.brand,
      category: p.category,
      price: p.price,
      description: p.description
    }));

    return `You are an AI product advisor. Analyze the user's query and recommend the most suitable products from the provided catalog.

User Query: "${userQuery}"

Product Catalog:
${JSON.stringify(productList, null, 2)}

Requirements:
1. Return exactly 3-5 product recommendations that best match the user's needs
2. Include reasoning for each recommendation explaining why it matches the query
3. Consider price, category, brand, and use case from the description
4. Format response as valid JSON only, no additional text

Response Format (JSON only):
{
  "recommendations": [
    {
      "product_id": "id_number",
      "relevance_score": 85,
      "reasoning": "This product matches because...",
      "key_features": ["feature1", "feature2"]
    }
  ],
  "query_analysis": "Brief analysis of what the user is looking for"
}`;
  }

  private static parseAIResponse(aiText: string): AIResponse {
    try {
      // Extract JSON from the response
      const jsonMatch = aiText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('No valid JSON found in response');
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      throw error;
    }
  }

  private static getMockRecommendations(userQuery: string): AIResponse {
    const query = userQuery.toLowerCase();
    let recommendations: AIRecommendation[] = [];
    let queryAnalysis = '';

    // New catalog categories: Healthtech, Personal Care, Entertainment, Kitchen, Home Improvement, Travel, Mobility, Security
    if (query.includes('health') || query.includes('massage') || query.includes('pain')) {
      queryAnalysis = 'User is looking for health and wellness products.';
      recommendations = [
        {
          product_id: '0',
          relevance_score: 90,
          reasoning: 'CURAPOD provides adaptive pain management with advanced technology for personalized therapy.',
          key_features: ['Pain relief', 'Adaptive therapy', 'Targeted treatment']
        },
        {
          product_id: '5',
          relevance_score: 85,
          reasoning: 'Charge Boost Massage Gun helps with muscle recovery and pain relief.',
          key_features: ['Muscle recovery', 'Multiple attachments', 'Deep massage']
        },
        {
          product_id: '2',
          relevance_score: 80,
          reasoning: 'Neck Massager relieves tension with multiple modes and heat therapy.',
          key_features: ['Neck relief', 'Heat therapy', 'Multiple modes']
        }
      ];
    } else if (query.includes('travel') || query.includes('luggage') || query.includes('backpack')) {
      queryAnalysis = 'User is looking for travel accessories and luggage solutions.';
      recommendations = [
        {
          product_id: '36',
          relevance_score: 95,
          reasoning: 'ARISTA VAULT Smart Back Pack with built-in power bank and anti-theft design, perfect for travel.',
          key_features: ['Built-in power bank', 'Anti-theft design', 'Smart features']
        },
        {
          product_id: '37',
          relevance_score: 90,
          reasoning: 'Jarviz Follow-me luggage is a revolutionary smart suitcase that follows you hands-free.',
          key_features: ['Follows you', 'Smart technology', 'Hands-free travel']
        },
        {
          product_id: '35',
          relevance_score: 85,
          reasoning: 'Wallet Bot Classic keeps your valuables safe with GPS tracking and anti-theft features.',
          key_features: ['GPS tracking', 'Anti-theft', 'Smart wallet']
        }
      ];
    } else if (query.includes('camera') || query.includes('security') || query.includes('surveillance')) {
      queryAnalysis = 'User is interested in security cameras or surveillance equipment.';
      recommendations = [
        {
          product_id: '47',
          relevance_score: 92,
          reasoning: 'EZVIZ Indoor PT H6C Pro offers 4MP pan-and-tilt camera with night vision for complete home monitoring.',
          key_features: ['4MP resolution', 'Pan and tilt', 'Night vision']
        },
        {
          product_id: '42',
          relevance_score: 88,
          reasoning: 'PandaX Wi-Fi Video Doorbell lets you see and speak to visitors from anywhere.',
          key_features: ['Two-way audio', 'Motion detection', 'Wi-Fi connected']
        },
        {
          product_id: '52',
          relevance_score: 85,
          reasoning: 'Qubo Dash Cam Pro captures every detail of your journey with advanced safety features.',
          key_features: ['High-quality video', 'Safety features', 'Dashboard camera']
        }
      ];
    } else if (query.includes('headphone') || query.includes('music') || query.includes('gaming')) {
      queryAnalysis = 'User is looking for audio equipment for music or gaming.';
      recommendations = [
        {
          product_id: '10',
          relevance_score: 93,
          reasoning: 'LEAF Bass Headphones deliver deep, powerful bass perfect for music lovers and gamers.',
          key_features: ['Deep bass', 'Over-ear comfort', 'Music and gaming']
        },
        {
          product_id: '17',
          relevance_score: 88,
          reasoning: 'bt Blaze Wired Gaming Headphones offer crystal-clear audio for competitive gaming.',
          key_features: ['Gaming optimized', 'Crystal-clear audio', 'Comfortable design']
        },
        {
          product_id: '13',
          relevance_score: 85,
          reasoning: 'HAMMER BeatBox Bluetooth Soundbar delivers rich immersive sound for entertainment.',
          key_features: ['Bluetooth connectivity', 'Rich sound', 'Movies and music']
        }
      ];
    } else if (query.includes('robot') || query.includes('vacuum') || query.includes('clean')) {
      queryAnalysis = 'User is interested in robot vacuums or cleaning devices.';
      recommendations = [
        {
          product_id: '26',
          relevance_score: 90,
          reasoning: 'MecTURING LASERON S9 Pro Plus ADC offers smart navigation with powerful suction.',
          key_features: ['Smart navigation', 'Powerful suction', 'Advanced cleaning']
        },
        {
          product_id: '29',
          relevance_score: 88,
          reasoning: 'ILIFE T20s Pro provides superior cleaning with powerful suction and mopping capabilities.',
          key_features: ['Vacuum and mop', 'Powerful suction', 'Smart features']
        },
        {
          product_id: '28',
          relevance_score: 85,
          reasoning: 'ILIFE A20 offers advanced mapping and scheduling for customized cleaning.',
          key_features: ['Advanced mapping', 'Scheduling', 'Robotic cleaning']
        }
      ];
    } else {
      // Default recommendations for general queries
      queryAnalysis = 'Here are some popular products from our catalog.';
      recommendations = [
        {
          product_id: '0',
          relevance_score: 80,
          reasoning: 'CURAPOD adaptive pain management device uses advanced technology for personalized therapy.',
          key_features: ['Pain relief', 'Advanced technology', 'Personalized therapy']
        },
        {
          product_id: '11',
          relevance_score: 78,
          reasoning: 'Halo Smart Ring tracks fitness and sleep patterns with a sleek design.',
          key_features: ['Fitness tracking', 'Sleep monitoring', 'Discreet design']
        },
        {
          product_id: '22',
          relevance_score: 75,
          reasoning: 'upliance.ai AI Cooking Assistant simplifies cooking with automated guidance.',
          key_features: ['AI-powered', 'Recipe guidance', 'Automated cooking']
        }
      ];
    }

    return {
      recommendations,
      query_analysis: queryAnalysis
    };
  }
}