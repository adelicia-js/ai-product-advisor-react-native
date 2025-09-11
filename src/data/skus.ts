import skusData from '../../skus.json';
import { Product } from '../types';

// Convert the SKUs data to our Product format with IDs
export const PRODUCT_CATALOG: Product[] = skusData.map((item, index) => ({
  id: index.toString(),
  product_name: item.product_name,
  brand: item.brand,
  category: item.category,
  price: item.price,
  description: item.description,
}));

// Export categories for filtering
export const CATEGORIES = [...new Set(PRODUCT_CATALOG.map(p => p.category))].sort();