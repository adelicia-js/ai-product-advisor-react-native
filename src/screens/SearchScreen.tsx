import React, { useState, useEffect } from "react";
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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  colors,
  spacing,
  borderRadius,
  typography,
  elevation,
} from "../theme/colors";
import { AIService } from "../services/aiService";
import { StorageService } from "../services/storageService";
import { SearchQuery } from "../types";

export const SearchScreen = () => {
  const navigation = useNavigation<any>();
  const [query, setQuery] = useState("");
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
      Alert.alert("Please enter a search query");
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
      navigation.navigate("Results", {
        query: query,
        recommendations: response.recommendations,
        queryAnalysis: response.query_analysis,
      });

      setQuery("");
      loadSearchHistory();
    } catch (error) {
      Alert.alert("Error", "Failed to get recommendations. Please try again.");
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
      "Clear History",
      "Are you sure you want to clear your search history?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          onPress: async () => {
            await StorageService.clearSearchHistory();
            setSearchHistory([]);
          },
          style: "destructive",
        },
      ]
    );
  };

  const suggestionExamples = [
    "I need a massage device for back pain",
    "Best robot vacuum cleaner for home",
    "Smart security camera for my house",
    "Portable hair dryer for travel",
    "Gaming headphones under ₹2000",
  ];

  return (
    <LinearGradient
      colors={colors.gradients.secondary}
      style={styles.container}
    >
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
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
              onPress={handleSearch}
              disabled={loading}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={
                  loading
                    ? [colors.text.light, colors.text.light]
                    : colors.gradients.button
                }
                style={styles.searchButton}
              >
                {loading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator color="#fff" size="small" />
                    <Text style={styles.loadingText}>Analyzing. . .</Text>
                  </View>
                ) : (
                  <View style={styles.buttonContent}>
                    <Ionicons
                      name="sparkles"
                      size={20}
                      color={colors.text.white}
                    />
                    <Text style={styles.searchButtonText}>
                      Get Recommendations
                    </Text>
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {showSuggestions && !query && (
            <View style={styles.suggestionsContainer}>
              <View style={styles.suggestionsHeader}>
                <Text style={styles.sectionTitle}>Try these examples:</Text>
              </View>
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: typography.fontFamily.primary,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.xl,
  },
  header: {
    marginBottom: spacing.xl,
    alignItems: "center",
    paddingTop: spacing.xxxl,
  },
  title: {
    fontSize: typography.fontSize.display,
    fontFamily: typography.fontFamily.secondary,
    color: colors.text.primary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.text.light,
    fontFamily: typography.fontFamily.light,
    textAlign: "center",
    lineHeight: 24,
  },
  searchContainer: {
    marginBottom: spacing.xxxl,
  },
  searchInput: {
    fontFamily: typography.fontFamily.light,
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    fontSize: typography.fontSize.md,
    minHeight: 120,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    marginBottom: spacing.lg,
    color: colors.text.primary,
    textAlignVertical: "top",
    ...elevation.sm,
  },
  searchButton: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
    ...elevation.md,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  searchButtonText: {
    color: colors.text.white,
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.semiBold,
    fontFamily: typography.fontFamily.light,
    letterSpacing: 0.2,
  },
  suggestionsContainer: {
    marginBottom: spacing.xl,
  },
  suggestionsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.primary,
    color: colors.text.primary,
    letterSpacing: 0.1,
  },
  suggestionItem: {
    backgroundColor: colors.background.card,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    ...elevation.sm,
  },
  suggestionText: {
    fontFamily: typography.fontFamily.extraLight,
    letterSpacing: 0.1,
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  historyContainer: {
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  clearButton: {
    color: colors.error,
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.primary,
    fontWeight: typography.fontWeight.medium,
  },
  historyItem: {
    backgroundColor: colors.background.card,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primaryLight,
    ...elevation.sm,
  },
  historyText: {
    fontFamily: typography.fontFamily.extraLight,
    letterSpacing: 0.1,
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    flex: 1,
    marginRight: spacing.md,
  },
  historyDate: {
    fontFamily: typography.fontFamily.extraLight,
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  loadingText: {
    color: colors.text.white,
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.light,
    letterSpacing: 0.1,
  },
});
