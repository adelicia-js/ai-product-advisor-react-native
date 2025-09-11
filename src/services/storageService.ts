import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchQuery } from '../types';

const SEARCH_HISTORY_KEY = 'search_history';
const FAVORITES_KEY = 'favorite_products';

export class StorageService {
  static async saveSearchQuery(query: SearchQuery): Promise<void> {
    try {
      const historyJson = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
      const history: SearchQuery[] = historyJson ? JSON.parse(historyJson) : [];
      
      // Add new query to the beginning
      history.unshift(query);
      
      // Keep only last 20 searches
      const trimmedHistory = history.slice(0, 20);
      
      await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(trimmedHistory));
    } catch (error) {
      console.error('Error saving search query:', error);
    }
  }

  static async getSearchHistory(): Promise<SearchQuery[]> {
    try {
      const historyJson = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
      return historyJson ? JSON.parse(historyJson) : [];
    } catch (error) {
      console.error('Error getting search history:', error);
      return [];
    }
  }

  static async clearSearchHistory(): Promise<void> {
    try {
      await AsyncStorage.removeItem(SEARCH_HISTORY_KEY);
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  }

  static async saveFavoriteProduct(productId: string): Promise<void> {
    try {
      const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
      const favorites: string[] = favoritesJson ? JSON.parse(favoritesJson) : [];
      
      if (!favorites.includes(productId)) {
        favorites.push(productId);
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      }
    } catch (error) {
      console.error('Error saving favorite product:', error);
    }
  }

  static async removeFavoriteProduct(productId: string): Promise<void> {
    try {
      const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
      const favorites: string[] = favoritesJson ? JSON.parse(favoritesJson) : [];
      
      const updatedFavorites = favorites.filter(id => id !== productId);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing favorite product:', error);
    }
  }

  static async getFavoriteProducts(): Promise<string[]> {
    try {
      const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
      return favoritesJson ? JSON.parse(favoritesJson) : [];
    } catch (error) {
      console.error('Error getting favorite products:', error);
      return [];
    }
  }

  static async isFavorite(productId: string): Promise<boolean> {
    try {
      const favorites = await this.getFavoriteProducts();
      return favorites.includes(productId);
    } catch (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }
  }
}