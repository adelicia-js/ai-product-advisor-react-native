import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { PRODUCT_CATALOG } from '../data/skus';
import { AIRecommendation } from '../types';

type ResultsScreenRouteProp = RouteProp<{
  Results: {
    query: string;
    recommendations: AIRecommendation[];
    queryAnalysis: string;
  };
}, 'Results'>;

export const ResultsScreen = () => {
  const route = useRoute<ResultsScreenRouteProp>();
  const navigation = useNavigation<any>();
  const { query, recommendations, queryAnalysis } = route.params;

  const getProduct = (productId: string) => {
    return PRODUCT_CATALOG[parseInt(productId)];
  };

  const getRelevanceColor = (score: number) => {
    if (score >= 90) return '#27ae60';
    if (score >= 75) return '#3498db';
    if (score >= 60) return '#f39c12';
    return '#95a5a6';
  };

  const handleProductPress = (productId: string) => {
    const product = getProduct(productId);
    if (product) {
      navigation.navigate('ProductDetail', { product });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.queryText}>Your Query:</Text>
          <Text style={styles.query}>"{query}"</Text>
        </View>

        <View style={styles.analysisContainer}>
          <Text style={styles.analysisTitle}>What we understood:</Text>
          <Text style={styles.analysisText}>{queryAnalysis}</Text>
        </View>

        <Text style={styles.recommendationsTitle}>
          Top {recommendations.length} Recommendations
        </Text>

        {recommendations.map((rec, index) => {
          const product = getProduct(rec.product_id);
          if (!product) return null;

          return (
            <TouchableOpacity
              key={index}
              style={styles.recommendationCard}
              onPress={() => handleProductPress(rec.product_id)}
              activeOpacity={0.8}
            >
              <View style={styles.cardHeader}>
                <View style={styles.rankBadge}>
                  <Text style={styles.rankText}>#{index + 1}</Text>
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.product_name}</Text>
                  <Text style={styles.brandText}>{product.brand}</Text>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.priceText}>₹{product.price.toLocaleString('en-IN')}</Text>
                </View>
              </View>

              <View style={styles.scoreContainer}>
                <View
                  style={[
                    styles.scoreBadge,
                    { backgroundColor: getRelevanceColor(rec.relevance_score) },
                  ]}
                >
                  <Text style={styles.scoreText}>{rec.relevance_score}% Match</Text>
                </View>
              </View>

              <View style={styles.reasoningContainer}>
                <Text style={styles.reasoningTitle}>Why this product?</Text>
                <Text style={styles.reasoningText}>{rec.reasoning}</Text>
              </View>

              <View style={styles.featuresContainer}>
                <Text style={styles.featuresTitle}>Key Features:</Text>
                <View style={styles.featuresList}>
                  {rec.key_features.map((feature, idx) => (
                    <View key={idx} style={styles.featureBadge}>
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.categoryText}>{product.category}</Text>
              </View>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={styles.newSearchButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.newSearchButtonText}>New Search</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  queryText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  query: {
    fontSize: 16,
    color: '#2c3e50',
    fontStyle: 'italic',
  },
  analysisContainer: {
    backgroundColor: '#ecf0f1',
    padding: 15,
    borderRadius: 12,
    marginBottom: 25,
  },
  analysisTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 8,
  },
  analysisText: {
    fontSize: 15,
    color: '#2c3e50',
    lineHeight: 22,
  },
  recommendationsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  recommendationCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  rankBadge: {
    backgroundColor: '#3498db',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  brandText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  priceContainer: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  scoreBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  scoreText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  ratingText: {
    fontSize: 14,
    color: '#f39c12',
  },
  reasoningContainer: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  reasoningTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 8,
  },
  reasoningText: {
    fontSize: 14,
    color: '#2c3e50',
    lineHeight: 20,
  },
  featuresContainer: {
    marginBottom: 15,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 10,
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureBadge: {
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  featureText: {
    fontSize: 12,
    color: '#34495e',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  categoryText: {
    fontSize: 13,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  stockStatus: {
    fontSize: 13,
    color: '#27ae60',
    fontWeight: '500',
  },
  newSearchButton: {
    backgroundColor: '#3498db',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  newSearchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});