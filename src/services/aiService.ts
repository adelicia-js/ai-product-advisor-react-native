import axios from "axios";
import { AIResponse, AIRecommendation } from "../types";
import { Product, PRODUCT_CATALOG } from "../data/products";
import { GEMINI_API_KEY } from '@env';

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// Simple in-memory cache for API responses
const responseCache = new Map<
  string,
  { response: AIResponse; timestamp: number }
>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export class AIService {
  static async getRecommendations(userQuery: string): Promise<AIResponse> {
    // Check cache first
    const cacheKey = userQuery.toLowerCase().trim();
    const cached = responseCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log("Returning cached response for:", cacheKey);
      return cached.response;
    }

    const prompt = this.createPrompt(userQuery, PRODUCT_CATALOG);

    try {
      const response = await axios.post(GEMINI_API_URL, {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
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
        timestamp: Date.now(),
      });

      // Clean old cache entries
      if (responseCache.size > 20) {
        const firstKey = responseCache.keys().next().value;
        if (firstKey !== undefined) {
          responseCache.delete(firstKey);
        }
      }

      return aiResponse;
    } catch (error: any) {
      console.error("AI Service Error:", error.response?.data || error.message);

      // Fallback to mock recommendations if API fails
      console.log("Falling back to mock recommendations due to API error");
      return this.getMockRecommendations(userQuery);
    }
  }

  private static createPrompt(userQuery: string, products: Product[]): string {
    const productList = products.map((p) => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      category: p.category,
      price: p.price,
      description: p.description,
      features: p.features,
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
      throw new Error("No valid JSON found in response");
    } catch (error) {
      console.error("Failed to parse AI response:", error);
      throw error;
    }
  }

  private static getMockRecommendations(userQuery: string): AIResponse {
    const query = userQuery.toLowerCase();
    let recommendations: AIRecommendation[] = [];
    let queryAnalysis = "";

    // Match with actual tech product catalog
    if (
      query.includes("laptop") ||
      query.includes("programming") ||
      query.includes("coding") ||
      query.includes("development")
    ) {
      queryAnalysis = "User is looking for a laptop suitable for programming and development work.";
      recommendations = [
        {
          product_id: "1",
          relevance_score: 95,
          reasoning:
            "MacBook Air M2 offers excellent performance for programming with long battery life and lightweight design.",
          key_features: [
            "M2 chip performance",
            "18-hour battery",
            "Lightweight at 2.7 lbs",
          ],
        },
        {
          product_id: "3",
          relevance_score: 90,
          reasoning:
            "ThinkPad X1 Carbon is a business-class laptop with excellent keyboard and durability for long coding sessions.",
          key_features: [
            "Military-grade durability",
            "15-hour battery",
            "1TB SSD storage",
          ],
        },
        {
          product_id: "2",
          relevance_score: 85,
          reasoning:
            "Dell XPS 13 provides powerful performance in a compact form factor perfect for developers on the go.",
          key_features: ["Intel Core i7", "16GB RAM", "512GB SSD"],
        },
      ];
    } else if (
      query.includes("headphone") ||
      query.includes("noise") ||
      query.includes("work") ||
      query.includes("music")
    ) {
      queryAnalysis =
        "User needs headphones for work or music with noise cancellation features.";
      recommendations = [
        {
          product_id: "11",
          relevance_score: 95,
          reasoning:
            "Sony WH-1000XM5 offers industry-leading noise cancellation perfect for focused work and music enjoyment.",
          key_features: [
            "Best-in-class ANC",
            "30-hour battery",
            "Multipoint connection",
          ],
        },
        {
          product_id: "12",
          relevance_score: 90,
          reasoning:
            "Bose QuietComfort 45 provides legendary comfort for all-day wear with excellent noise cancellation.",
          key_features: [
            "Legendary comfort",
            "24-hour battery",
            "Clear calls",
          ],
        },
        {
          product_id: "10",
          relevance_score: 85,
          reasoning:
            "AirPods Pro 2 offers premium wireless experience with active noise cancellation in a compact form.",
          key_features: ["Active noise cancellation", "Spatial audio", "MagSafe charging"],
        },
      ];
    } else if (
      query.includes("smartphone") ||
      query.includes("phone") ||
      query.includes("camera") ||
      query.includes("photo")
    ) {
      queryAnalysis =
        "User is looking for a smartphone with emphasis on camera quality.";
      recommendations = [
        {
          product_id: "8",
          relevance_score: 95,
          reasoning:
            "Google Pixel 8 Pro features exceptional computational photography with AI-powered camera features.",
          key_features: [
            "Best-in-class camera",
            "Magic Eraser",
            "Pure Android",
          ],
        },
        {
          product_id: "6",
          relevance_score: 92,
          reasoning:
            "iPhone 15 Pro offers advanced camera system with ProRAW and ProRes video capabilities.",
          key_features: [
            "48MP camera",
            "ProMotion display",
            "Titanium build",
          ],
        },
        {
          product_id: "7",
          relevance_score: 88,
          reasoning:
            "Samsung Galaxy S24 Ultra features a 200MP camera with S Pen for creative control.",
          key_features: [
            "200MP camera",
            "S Pen included",
            "6.8-inch display",
          ],
        },
      ];
    } else if (
      query.includes("watch") ||
      query.includes("fitness") ||
      query.includes("health") ||
      query.includes("tracking")
    ) {
      queryAnalysis =
        "User wants a smartwatch for fitness tracking and health monitoring.";
      recommendations = [
        {
          product_id: "17",
          relevance_score: 94,
          reasoning:
            "Apple Watch Series 9 provides comprehensive health tracking with ECG and blood oxygen monitoring.",
          key_features: ["Blood oxygen monitoring", "ECG", "GPS"],
        },
        {
          product_id: "19",
          relevance_score: 92,
          reasoning:
            "Garmin Fenix 7 is perfect for serious athletes with advanced training metrics and solar charging.",
          key_features: [
            "18-day battery",
            "Solar charging",
            "Advanced training metrics",
          ],
        },
        {
          product_id: "18",
          relevance_score: 87,
          reasoning:
            "Samsung Galaxy Watch 6 offers body composition analysis and comprehensive sleep tracking.",
          key_features: ["Body composition", "Sleep tracking", "40-hour battery"],
        },
      ];
    } else if (
      query.includes("tablet") ||
      query.includes("ipad") ||
      query.includes("draw") ||
      query.includes("note")
    ) {
      queryAnalysis =
        "User needs a tablet for creative work or note-taking.";
      recommendations = [
        {
          product_id: "14",
          relevance_score: 95,
          reasoning:
            "iPad Pro 12.9 with M2 chip offers professional-grade performance with Apple Pencil support for digital art.",
          key_features: [
            "M2 chip",
            "Liquid Retina XDR",
            "Apple Pencil support",
          ],
        },
        {
          product_id: "15",
          relevance_score: 90,
          reasoning:
            "Samsung Galaxy Tab S9 Ultra features large AMOLED display with included S Pen for productivity.",
          key_features: [
            "14.6-inch AMOLED",
            "S Pen included",
            "Water resistant",
          ],
        },
        {
          product_id: "16",
          relevance_score: 85,
          reasoning:
            "Microsoft Surface Pro 9 runs full Windows 11 for complete desktop experience in tablet form.",
          key_features: ["Full Windows 11", "Type Cover compatible", "Surface Pen support"],
        },
      ];
    } else if (
      query.includes("gaming") ||
      query.includes("game") ||
      query.includes("console") ||
      query.includes("play")
    ) {
      queryAnalysis =
        "User is interested in gaming consoles or gaming equipment.";
      recommendations = [
        {
          product_id: "27",
          relevance_score: 92,
          reasoning:
            "PlayStation 5 offers next-gen gaming with ray tracing and ultra-fast SSD for incredible performance.",
          key_features: [
            "4K gaming",
            "Ray tracing",
            "DualSense controller",
          ],
        },
        {
          product_id: "28",
          relevance_score: 90,
          reasoning:
            "Xbox Series X provides powerful 4K gaming with Game Pass for access to hundreds of games.",
          key_features: [
            "120fps support",
            "Game Pass",
            "Quick Resume",
          ],
        },
        {
          product_id: "30",
          relevance_score: 88,
          reasoning:
            "Steam Deck lets you play your entire Steam library portably with PC gaming power.",
          key_features: ["Portable PC gaming", "Steam library", "Expandable storage"],
        },
      ];
    } else {
      // Default recommendations for general queries
      queryAnalysis = "Here are some popular products from our catalog that might interest you.";
      recommendations = [
        {
          product_id: "1",
          relevance_score: 85,
          reasoning:
            "MacBook Air M2 is a versatile laptop perfect for everyday computing and creative work.",
          key_features: [
            "M2 chip",
            "All-day battery",
            "Lightweight design",
          ],
        },
        {
          product_id: "6",
          relevance_score: 82,
          reasoning:
            "iPhone 15 Pro is a premium smartphone with advanced features for productivity and entertainment.",
          key_features: [
            "A17 Pro chip",
            "ProMotion display",
            "5G connectivity",
          ],
        },
        {
          product_id: "11",
          relevance_score: 80,
          reasoning:
            "Sony WH-1000XM5 headphones deliver exceptional audio quality for any listening experience.",
          key_features: ["Premium sound", "Noise cancellation", "30-hour battery"],
        },
      ];
    }

    return {
      recommendations,
      query_analysis: queryAnalysis,
    };
  }
}
