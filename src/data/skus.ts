// Re-export from products.ts for backward compatibility
export { PRODUCT_CATALOG } from './products';
import { PRODUCT_CATALOG } from './products';

// Export categories for filtering
export const CATEGORIES = [...new Set(PRODUCT_CATALOG.map(p => p.category))].sort();