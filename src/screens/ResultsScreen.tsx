import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import {
  colors,
  spacing,
  borderRadius,
  typography,
  elevation,
} from "../theme/colors";
import { PRODUCT_CATALOG } from "../data/skus";
import { AIRecommendation } from "../types";

type ResultsScreenRouteProp = RouteProp<
  {
    Results: {
      query: string;
      recommendations: AIRecommendation[];
      queryAnalysis: string;
    };
  },
  "Results"
>;

export const ResultsScreen = () => {
  const route = useRoute<ResultsScreenRouteProp>();
  const navigation = useNavigation<any>();
  const { query, recommendations, queryAnalysis } = route.params;

  const getProduct = (productId: string) => {
    return PRODUCT_CATALOG.find(p => p.id === productId);
  };

  const getRelevanceColor = (score: number) => {
    if (score >= 90) return "#27ae60";
    if (score >= 75) return "#3498db";
    if (score >= 60) return "#f39c12";
    return "#95a5a6";
  };

  const getRelevanceGradient = (score: number) => {
    if (score >= 90) return ["#99ef9bd8", "#079442ca"];
    if (score >= 75) return ["#78afd4d5", "#074e7eb9"];
    if (score >= 60) return ["#e4dc81df", "#f37a10a4"];
    return ["#95a5a6b9", "#7f8c8d85"];
  };

  const handleProductPress = (productId: string) => {
    const product = getProduct(productId);
    if (product) {
      navigation.navigate("ProductDetail", { product });
    }
  };

  return (
    <LinearGradient
      colors={colors.gradients.secondary}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
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
                onPress={() => handleProductPress(rec.product_id)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={colors.gradients.card}
                  style={styles.recommendationCard}
                >
                  <View style={styles.cardHeader}>
                    <View style={styles.rankBadge}>
                      <Text style={styles.rankText}>#{index + 1}</Text>
                    </View>
                    <View style={styles.productInfo}>
                      <Text style={styles.productName}>
                        {product.name}
                      </Text>
                      <Text style={styles.brandText}>{product.brand}</Text>
                    </View>
                    <View style={styles.priceContainer}>
                      <Text style={styles.priceText}>
                        ₹{product.price.toLocaleString("en-IN")}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.scoreContainer}>
                    <View
                      style={[
                        styles.scoreBadge,
                        {
                          experimental_backgroundImage: `linear-gradient(45deg, ${getRelevanceGradient(
                            rec.relevance_score
                          ).join(", ")})`,
                        },
                      ]}
                    >
                      <Text style={styles.scoreText}>
                        {rec.relevance_score}% Match
                      </Text>
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
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={colors.text.light}
                    />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={colors.gradients.button}
              style={styles.newSearchButton}
            >
              <Ionicons name="search" size={20} color={colors.text.white} />
              <Text style={styles.newSearchButtonText}>New Search</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: typography.fontFamily.primary,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  header: {
    marginBottom: spacing.xl,
    padding: spacing.lg,
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    ...elevation.sm,
  },
  queryText: {
    fontSize: typography.fontSize.lg,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
    fontFamily: typography.fontFamily.primary,
  },
  query: {
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    fontStyle: "italic",
    fontFamily: typography.fontFamily.primary,
  },
  analysisContainer: {
    backgroundColor: colors.background.card,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xxl,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    ...elevation.sm,
  },
  analysisTitle: {
    fontSize: typography.fontSize.lg,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    fontFamily: typography.fontFamily.primary,
  },
  analysisText: {
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    lineHeight: 22,
    fontFamily: typography.fontFamily.primary,
  },
  recommendationsTitle: {
    fontSize: typography.fontSize.xxl,
    color: colors.text.primary,
    marginBottom: spacing.xl,
    fontFamily: typography.fontFamily.primary,
  },
  recommendationCard: {
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    ...elevation.md,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  rankBadge: {
    backgroundColor: "#3498db",
    experimental_backgroundImage: "linear-gradient(45deg, #4c7e3b9c, #eac73d)",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  rankText: {
    color: "#fff",
    fontSize: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: typography.fontSize.lg,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    fontFamily: typography.fontFamily.primary,
  },
  brandText: {
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    fontFamily: typography.fontFamily.primary,
  },
  priceContainer: {
    backgroundColor: "#e8f5e9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 18,
    color: "#27ae60",
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    gap: 10,
  },
  scoreBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  scoreText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  ratingText: {
    fontSize: 14,
    color: "#f39c12",
  },
  reasoningContainer: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  reasoningTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#34495e",
    marginBottom: 8,
  },
  reasoningText: {
    fontSize: 14,
    color: "#2c3e50",
    lineHeight: 20,
  },
  featuresContainer: {
    marginBottom: 15,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#34495e",
    marginBottom: 10,
  },
  featuresList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  featureBadge: {
    backgroundColor: "#ecf0f1",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  featureText: {
    fontSize: 12,
    color: "#34495e",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#ecf0f1",
  },
  categoryText: {
    fontSize: 13,
    color: colors.text.secondary,
    fontWeight: "500",
  },
  stockStatus: {
    fontSize: 13,
    color: "#27ae60",
    fontWeight: "500",
  },
  newSearchButton: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.xl,
    ...elevation.md,
  },
  newSearchButtonText: {
    color: colors.text.white,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    fontFamily: typography.fontFamily.primary,
  },
});
