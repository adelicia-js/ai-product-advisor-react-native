import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AIService } from '../services/aiService';
import { StorageService } from '../services/storageService';
import { SearchQuery } from '../types';

export const SearchScreen = () => {
  const navigation = useNavigation<any>();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchQuery[]>([]);
  const [showSuggestions] = useState(true);

  useEffect(() => {
    loadSearchHistory();
  }, []);

  const loadSearchHistory = async () => {
    const history = await StorageService.getSearchHistory();
    setSearchHistory(history);
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      Alert.alert('Please enter a search query');
      return;
    }

    setLoading(true);
    try {
      const response = await AIService.getRecommendations(query);
      
      // Save to history
      const searchQuery: SearchQuery = {
        id: Date.now().toString(),
        query: query,
        timestamp: new Date(),
        recommendations: response.recommendations,
      };
      
      await StorageService.saveSearchQuery(searchQuery);
      
      // Navigate to results
      navigation.navigate('Results', {
        query: query,
        recommendations: response.recommendations,
        queryAnalysis: response.query_analysis,
      });
      
      setQuery('');
      loadSearchHistory();
    } catch (error) {
      Alert.alert('Error', 'Failed to get recommendations. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleHistoryItemPress = (item: SearchQuery) => {
    setQuery(item.query);
  };

  const clearHistory = async () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear your search history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          onPress: async () => {
            await StorageService.clearSearchHistory();
            setSearchHistory([]);
          },
          style: 'destructive',
        },
      ]
    );
  };

  const suggestionExamples = [
    'I need a massage device for back pain',
    'Best robot vacuum cleaner for home',
    'Smart security camera for my house',
    'Portable hair dryer for travel',
    'Gaming headphones under ₹2000',
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>AI Product Advisor</Text>
          <Text style={styles.subtitle}>
            Describe what you're looking for in plain English
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="e.g., I need a laptop for programming with long battery life"
            placeholderTextColor="#999"
            value={query}
            onChangeText={setQuery}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
          
          <TouchableOpacity
            style={[styles.searchButton, loading && styles.searchButtonDisabled]}
            onPress={handleSearch}
            disabled={loading}
          >
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color="#fff" size="small" />
                <Text style={styles.loadingText}>Analyzing...</Text>
              </View>
            ) : (
              <Text style={styles.searchButtonText}>Get Recommendations</Text>
            )}
          </TouchableOpacity>
        </View>

        {showSuggestions && !query && (
          <View style={styles.suggestionsContainer}>
            <Text style={styles.sectionTitle}>Try these examples:</Text>
            {suggestionExamples.map((example, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionItem}
                onPress={() => setQuery(example)}
              >
                <Text style={styles.suggestionText}>{example}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {searchHistory.length > 0 && (
          <View style={styles.historyContainer}>
            <View style={styles.historyHeader}>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              <TouchableOpacity onPress={clearHistory}>
                <Text style={styles.clearButton}>Clear</Text>
              </TouchableOpacity>
            </View>
            
            {searchHistory.slice(0, 5).map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.historyItem}
                onPress={() => handleHistoryItemPress(item)}
              >
                <Text style={styles.historyText} numberOfLines={1}>
                  {item.query}
                </Text>
                <Text style={styles.historyDate}>
                  {new Date(item.timestamp).toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  searchContainer: {
    marginBottom: 30,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 15,
  },
  searchButton: {
    backgroundColor: '#3498db',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
  },
  searchButtonDisabled: {
    backgroundColor: '#95a5a6',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  suggestionsContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 15,
  },
  suggestionItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  suggestionText: {
    fontSize: 15,
    color: '#34495e',
  },
  historyContainer: {
    marginTop: 20,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  clearButton: {
    color: '#e74c3c',
    fontSize: 14,
  },
  historyItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  historyText: {
    fontSize: 15,
    color: '#34495e',
    flex: 1,
    marginRight: 10,
  },
  historyDate: {
    fontSize: 12,
    color: '#95a5a6',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});