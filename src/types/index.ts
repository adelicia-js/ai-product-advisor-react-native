export interface Product {
  id: string;
  product_name: string;
  brand: string;
  category: string;
  price: number;
  description: string;
}

export interface AIRecommendation {
  product_id: string;
  relevance_score: number;
  reasoning: string;
  key_features: string[];
}

export interface AIResponse {
  recommendations: AIRecommendation[];
  query_analysis: string;
}

export interface SearchQuery {
  id: string;
  query: string;
  timestamp: Date;
  recommendations?: AIRecommendation[];
}