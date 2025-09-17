import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  colors,
  spacing,
  borderRadius,
  typography,
  elevation,
} from "../theme/colors";
import { StorageService } from "../services/storageService";
import { PRODUCT_CATALOG } from "../data/skus";
import { Product } from "../types";

export const FavoritesScreen = () => {
  const navigation = useNavigation<any>();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const favoriteIds = await StorageService.getFavoriteProducts();
      const products = favoriteIds
        .map((id) => PRODUCT_CATALOG.find((p) => p.id === id))
        .filter(Boolean) as Product[];
      setFavoriteProducts(products);
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reload favorites when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const handleProductPress = (product: Product) => {
    navigation.navigate("ProductDetail", { product });
  };

  const handleRemoveFavorite = async (productId: string) => {
    Alert.alert(
      "Remove from Favorites",
      "Are you sure you want to remove this product from favorites?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            await StorageService.removeFavoriteProduct(productId);
            loadFavorites();
          },
        },
      ]
    );
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handleProductPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.productHeader}>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.product_name}</Text>
          <Text style={styles.brandText}>{item.brand}</Text>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.priceText}>
            ₹{item.price.toLocaleString("en-IN")}
          </Text>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveFavorite(item.id)}
          >
            <Text style={styles.removeButtonText}>❌</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.descriptionText} numberOfLines={2}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>💔</Text>
      <Text style={styles.emptyTitle}>No Favorites Yet</Text>
      <Text style={styles.emptyText}>
        Products you mark as favorites will appear here
      </Text>
      <TouchableOpacity
        style={styles.browseButton}
        onPress={() => navigation.navigate("Search")}
      >
        <Text style={styles.browseButtonText}>Browse Products</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={colors.gradients.secondary}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>My Favorites</Text>
          <Text style={styles.subtitle}>
            {favoriteProducts.length}{" "}
            {favoriteProducts.length === 1 ? "product" : "products"} saved
          </Text>
        </View>

        {!loading && favoriteProducts.length === 0 ? (
          <EmptyState />
        ) : (
          <FlatList
            data={favoriteProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshing={loading}
            onRefresh={loadFavorites}
          />
        )}
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
  header: {
    padding: 20,
    paddingTop: 45,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: typography.fontSize.hero,
    color: colors.text.primary,
    fontFamily: typography.fontFamily.secondary,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.text.light,
    fontFamily: typography.fontFamily.extraLight,
  },
  listContent: {
    padding: 20,
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: typography.fontSize.xl,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    fontFamily: typography.fontFamily.primary,
  },
  brandText: {
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
    fontFamily: typography.fontFamily.primary,
  },
  categoryText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.light,
    fontFamily: typography.fontFamily.italic,
  },
  rightSection: {
    alignItems: "flex-end",
  },
  priceText: {
    fontSize: 20,
    color: "#27ae60",
    marginBottom: 8,
  },
  removeButton: {
    padding: 5,
  },
  removeButtonText: {
    fontSize: 18,
  },
  descriptionText: {
    fontSize: 14,
    color: "#34495e",
    lineHeight: 20,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ecf0f1",
  },
  ratingText: {
    fontSize: 14,
    color: "#f39c12",
  },
  stockText: {
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    height: "100%",
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 5,
    filter: "grayscale(100%)",
  },
  emptyTitle: {
    fontSize: typography.fontSize.xxxl,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    fontFamily: typography.fontFamily.extraLight,
  },
  emptyText: {
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    textAlign: "center",
    fontFamily: typography.fontFamily.extraLight,
    marginBottom: spacing.sm,
  },
  browseButton: {
    backgroundColor: "#c6d59985",
    experimental_backgroundImage:
      "linear-gradient(45deg, #93b799b8, #c1d09385)",
    paddingHorizontal: spacing.xxxl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    ...elevation.md,
  },
  browseButtonText: {
    color: colors.text.white,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    fontFamily: typography.fontFamily.extraLight,
  },
});
