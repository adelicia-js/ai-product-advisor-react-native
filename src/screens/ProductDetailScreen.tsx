import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Share,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { colors, spacing, borderRadius, typography, elevation } from '../theme/colors';
import { Product } from '../types';
import { StorageService } from '../services/storageService';

type ProductDetailScreenRouteProp = RouteProp<{
  ProductDetail: {
    product: Product;
  };
}, 'ProductDetail'>;

export const ProductDetailScreen = () => {
  const route = useRoute<ProductDetailScreenRouteProp>();
  const navigation = useNavigation<any>();
  const { product } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkFavoriteStatus();
  }, []);

  const checkFavoriteStatus = async () => {
    const favoriteStatus = await StorageService.isFavorite(product.id);
    setIsFavorite(favoriteStatus);
  };

  const toggleFavorite = async () => {
    if (isFavorite) {
      await StorageService.removeFavoriteProduct(product.id);
      setIsFavorite(false);
      Alert.alert('Removed', 'Product removed from favorites');
    } else {
      await StorageService.saveFavoriteProduct(product.id);
      setIsFavorite(true);
      Alert.alert('Added', 'Product added to favorites');
    }
  };

  const shareProduct = async () => {
    try {
      await Share.share({
        message: `Check out ${product.product_name} by ${product.brand} - ${product.description}\n\nPrice: ₹${product.price.toLocaleString('en-IN')}`,
        title: product.product_name,
      });
    } catch (error) {
      console.error('Error sharing product:', error);
    }
  };

  const getRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      '⭐'.repeat(fullStars) +
      (hasHalfStar ? '✨' : '') +
      '☆'.repeat(emptyStars)
    );
  };

  return (
    <LinearGradient colors={colors.gradients.secondary} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.productName}>{product.product_name}</Text>
            <Text style={styles.brandName}>{product.brand}</Text>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={toggleFavorite}
            >
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={24}
                color={isFavorite ? '#e74c3c' : '#7f8c8d'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={shareProduct}
            >
              <Ionicons
                name="share-outline"
                size={24}
                color="#7f8c8d"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.priceRatingContainer}>
          <View style={styles.priceSection}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.priceText}>₹{product.price.toLocaleString('en-IN')}</Text>
          </View>
          
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Category</Text>
            <Text style={styles.infoValue}>{product.category}</Text>
          </View>
        </View>

        <View style={styles.descriptionCard}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{product.description}</Text>
        </View>


        <View style={styles.compareSection}>
          <TouchableOpacity
            style={styles.compareButton}
            onPress={() => navigation.navigate('Search')}
          >
            <Text style={styles.compareButtonText}>Find Similar Products</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity activeOpacity={0.8}>
          <LinearGradient
            colors={colors.gradients.button}
            style={styles.buyButton}
          >
            <Ionicons name="eye" size={20} color={colors.text.white} />
            <Text style={styles.buyButtonText}>View Product Details</Text>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1,
  },
  productName: {
    fontSize: typography.fontSize.xl,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    fontFamily: typography.fontFamily.primary,
  },
  brandName: {
    fontSize: typography.fontSize.md,
    color: colors.text.tertiary,
    fontFamily: typography.fontFamily.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  actionButtonText: {
    fontSize: 20,
  },
  priceRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  priceSection: {
    backgroundColor: '#c6d59985',
    experimental_backgroundImage: 'linear-gradient(45deg, #d2eed6b9, #c1d09385)',
    padding: 15,
    borderRadius: 12,
    flex: 1,
    marginRight: 10,
  },
  priceLabel: {
    fontSize: typography.fontSize.md,
    color: colors.success,
    marginBottom: spacing.xs,
    fontFamily: typography.fontFamily.primary,
  },
  priceText: {
    fontSize: typography.fontSize.hero,
    color: colors.success,
    fontFamily: typography.fontFamily.primary,
  },
  ratingSection: {
    backgroundColor: '#fff3e0',
    padding: 15,
    borderRadius: 12,
    flex: 1,
    alignItems: 'center',
  },
  ratingLabel: {
    fontSize: 14,
    color: '#f39c12',
    marginBottom: 5,
  },
  ratingStars: {
    fontSize: 16,
    marginBottom: 3,
  },
  ratingValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f39c12',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: typography.fontSize.lg,
    color: colors.text.secondary,
    fontFamily: typography.fontFamily.primary,
  },
  infoValue: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text.primary,
    fontFamily: typography.fontFamily.primary,
  },
  descriptionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text.primary,
    marginBottom: spacing.md,
    fontFamily: typography.fontFamily.primary,
  },
  descriptionText: {
    fontSize: typography.fontSize.lg,
    color: colors.text.primary,
    lineHeight: 24,
    fontFamily: typography.fontFamily.primary,
  },
  featuresCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  featureBullet: {
    fontSize: 16,
    color: '#3498db',
    marginRight: 10,
  },
  featureText: {
    fontSize: 15,
    color: '#34495e',
    flex: 1,
    lineHeight: 22,
  },
  compareSection: {
    marginBottom: 20,
  },
  compareButton: {
    backgroundColor: '#c6d59985',
    experimental_backgroundImage: 'linear-gradient(45deg, #d2eed6b9, #c1d09385)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  compareButtonText: {
    fontSize: typography.fontSize.lg,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.semiBold,
    fontFamily: typography.fontFamily.primary,
  },
  buyButton: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    ...elevation.md,
  },
  buyButtonText: {
    color: colors.text.white,
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.primary,
  },
});