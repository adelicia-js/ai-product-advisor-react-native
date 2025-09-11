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
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
              <Text style={styles.actionButtonText}>
                {isFavorite ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={shareProduct}
            >
              <Text style={styles.actionButtonText}>📤</Text>
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

        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>View Product Details</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  brandName: {
    fontSize: 18,
    color: '#7f8c8d',
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
    backgroundColor: '#e8f5e9',
    padding: 15,
    borderRadius: 12,
    flex: 1,
    marginRight: 10,
  },
  priceLabel: {
    fontSize: 14,
    color: '#27ae60',
    marginBottom: 5,
  },
  priceText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#27ae60',
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
    fontSize: 15,
    color: '#7f8c8d',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
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
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 15,
    color: '#34495e',
    lineHeight: 24,
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
    backgroundColor: '#ecf0f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  compareButtonText: {
    fontSize: 16,
    color: '#34495e',
    fontWeight: '600',
  },
  buyButton: {
    backgroundColor: '#3498db',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});