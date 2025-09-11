export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  features: string[];
  image?: string;
  rating?: number;
  inStock: boolean;
}

export const PRODUCT_CATALOG: Product[] = [
  // Laptops
  {
    id: '1',
    name: 'MacBook Air M2',
    brand: 'Apple',
    category: 'Laptops',
    price: 1199,
    description: 'Ultra-thin and light laptop with M2 chip for exceptional performance and battery life.',
    features: ['M2 chip', '13.6-inch display', '18-hour battery', 'Lightweight at 2.7 lbs', '8GB RAM', '256GB SSD'],
    rating: 4.8,
    inStock: true
  },
  {
    id: '2',
    name: 'Dell XPS 13',
    brand: 'Dell',
    category: 'Laptops',
    price: 999,
    description: 'Compact and powerful Windows laptop with stunning display.',
    features: ['Intel Core i7', '13.4-inch display', '12-hour battery', 'Lightweight at 2.6 lbs', '16GB RAM', '512GB SSD'],
    rating: 4.6,
    inStock: true
  },
  {
    id: '3',
    name: 'ThinkPad X1 Carbon',
    brand: 'Lenovo',
    category: 'Laptops',
    price: 1399,
    description: 'Business-class laptop with military-grade durability.',
    features: ['Intel Core i7', '14-inch display', '15-hour battery', 'Military tested', '16GB RAM', '1TB SSD'],
    rating: 4.7,
    inStock: true
  },
  {
    id: '4',
    name: 'HP Spectre x360',
    brand: 'HP',
    category: 'Laptops',
    price: 1299,
    description: '2-in-1 convertible laptop with touchscreen and stylus support.',
    features: ['Intel Core i7', '13.5-inch touchscreen', '2-in-1 convertible', '10-hour battery', '16GB RAM', '512GB SSD'],
    rating: 4.5,
    inStock: true
  },
  {
    id: '5',
    name: 'ASUS ROG Zephyrus G14',
    brand: 'ASUS',
    category: 'Laptops',
    price: 1599,
    description: 'Gaming laptop with powerful graphics in a portable form factor.',
    features: ['AMD Ryzen 9', 'NVIDIA RTX 3060', '14-inch 144Hz display', 'Gaming performance', '16GB RAM', '1TB SSD'],
    rating: 4.6,
    inStock: true
  },

  // Smartphones
  {
    id: '6',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    category: 'Smartphones',
    price: 999,
    description: 'Premium smartphone with titanium design and advanced camera system.',
    features: ['A17 Pro chip', 'ProMotion display', '48MP camera', 'Titanium build', '5G', 'All-day battery'],
    rating: 4.9,
    inStock: true
  },
  {
    id: '7',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    category: 'Smartphones',
    price: 1199,
    description: 'Android flagship with S Pen and advanced AI features.',
    features: ['Snapdragon 8 Gen 3', '200MP camera', 'S Pen included', '6.8-inch display', '5G', '5000mAh battery'],
    rating: 4.8,
    inStock: true
  },
  {
    id: '8',
    name: 'Google Pixel 8 Pro',
    brand: 'Google',
    category: 'Smartphones',
    price: 899,
    description: 'AI-powered smartphone with exceptional computational photography.',
    features: ['Google Tensor G3', 'Magic Eraser', 'Best-in-class camera', '6.7-inch display', '5G', 'Pure Android'],
    rating: 4.7,
    inStock: true
  },
  {
    id: '9',
    name: 'OnePlus 12',
    brand: 'OnePlus',
    category: 'Smartphones',
    price: 799,
    description: 'Fast charging flagship with smooth performance.',
    features: ['Snapdragon 8 Gen 3', '100W fast charging', 'Hasselblad camera', '6.82-inch display', '5G', 'OxygenOS'],
    rating: 4.6,
    inStock: true
  },

  // Headphones
  {
    id: '10',
    name: 'AirPods Pro 2',
    brand: 'Apple',
    category: 'Headphones',
    price: 249,
    description: 'Premium wireless earbuds with active noise cancellation.',
    features: ['Active noise cancellation', 'Spatial audio', '6-hour battery', 'MagSafe charging', 'Transparency mode', 'Adaptive EQ'],
    rating: 4.7,
    inStock: true
  },
  {
    id: '11',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    category: 'Headphones',
    price: 399,
    description: 'Industry-leading noise cancelling over-ear headphones.',
    features: ['Best-in-class ANC', '30-hour battery', 'Multipoint connection', 'Hi-Res audio', 'Speak-to-chat', 'Lightweight'],
    rating: 4.8,
    inStock: true
  },
  {
    id: '12',
    name: 'Bose QuietComfort 45',
    brand: 'Bose',
    category: 'Headphones',
    price: 329,
    description: 'Comfortable noise-cancelling headphones for all-day wear.',
    features: ['Legendary comfort', 'Noise cancellation', '24-hour battery', 'Clear calls', 'Aware mode', 'Lightweight'],
    rating: 4.6,
    inStock: true
  },
  {
    id: '13',
    name: 'Sennheiser Momentum 4',
    brand: 'Sennheiser',
    category: 'Headphones',
    price: 349,
    description: 'Audiophile-grade wireless headphones with exceptional sound quality.',
    features: ['Audiophile sound', '60-hour battery', 'Adaptive ANC', 'Premium materials', 'Multipoint', 'Smart pause'],
    rating: 4.7,
    inStock: true
  },

  // Tablets
  {
    id: '14',
    name: 'iPad Pro 12.9',
    brand: 'Apple',
    category: 'Tablets',
    price: 1099,
    description: 'Professional tablet with M2 chip and stunning display.',
    features: ['M2 chip', '12.9-inch Liquid Retina XDR', 'ProMotion 120Hz', 'Apple Pencil support', 'Face ID', 'All-day battery'],
    rating: 4.8,
    inStock: true
  },
  {
    id: '15',
    name: 'Samsung Galaxy Tab S9 Ultra',
    brand: 'Samsung',
    category: 'Tablets',
    price: 1199,
    description: 'Large Android tablet with S Pen for productivity.',
    features: ['14.6-inch AMOLED', 'S Pen included', 'Snapdragon 8 Gen 2', 'Water resistant', 'DeX mode', '11,200mAh battery'],
    rating: 4.6,
    inStock: true
  },
  {
    id: '16',
    name: 'Microsoft Surface Pro 9',
    brand: 'Microsoft',
    category: 'Tablets',
    price: 999,
    description: '2-in-1 Windows tablet for work and creativity.',
    features: ['Intel Core i5', '13-inch PixelSense', 'Full Windows 11', 'Type Cover compatible', 'Surface Pen support', 'All-day battery'],
    rating: 4.5,
    inStock: true
  },

  // Smartwatches
  {
    id: '17',
    name: 'Apple Watch Series 9',
    brand: 'Apple',
    category: 'Smartwatches',
    price: 399,
    description: 'Advanced health and fitness tracking smartwatch.',
    features: ['Blood oxygen monitoring', 'ECG', 'Always-on display', 'GPS', 'Water resistant', '18-hour battery'],
    rating: 4.8,
    inStock: true
  },
  {
    id: '18',
    name: 'Samsung Galaxy Watch 6',
    brand: 'Samsung',
    category: 'Smartwatches',
    price: 329,
    description: 'Android smartwatch with comprehensive health features.',
    features: ['Body composition', 'Sleep tracking', 'GPS', 'Water resistant', 'Wear OS', '40-hour battery'],
    rating: 4.5,
    inStock: true
  },
  {
    id: '19',
    name: 'Garmin Fenix 7',
    brand: 'Garmin',
    category: 'Smartwatches',
    price: 699,
    description: 'Premium multisport GPS watch for serious athletes.',
    features: ['Multi-GNSS', 'Solar charging', '18-day battery', 'Advanced training metrics', 'Topographic maps', 'Music storage'],
    rating: 4.7,
    inStock: true
  },

  // Cameras
  {
    id: '20',
    name: 'Sony A7 IV',
    brand: 'Sony',
    category: 'Cameras',
    price: 2498,
    description: 'Full-frame mirrorless camera for professionals.',
    features: ['33MP full-frame', '4K 60fps video', '10fps burst', 'In-body stabilization', 'Dual card slots', 'Pro features'],
    rating: 4.9,
    inStock: true
  },
  {
    id: '21',
    name: 'Canon EOS R6 Mark II',
    brand: 'Canon',
    category: 'Cameras',
    price: 2499,
    description: 'Versatile full-frame mirrorless for photo and video.',
    features: ['24MP full-frame', '4K 60fps', '40fps burst', 'Dual Pixel AF', 'In-body stabilization', 'Weather sealed'],
    rating: 4.8,
    inStock: true
  },
  {
    id: '22',
    name: 'GoPro Hero 12',
    brand: 'GoPro',
    category: 'Cameras',
    price: 399,
    description: 'Rugged action camera for adventure recording.',
    features: ['5.3K video', 'HyperSmooth 6.0', 'Waterproof', 'HDR video', 'Longer battery', 'Voice control'],
    rating: 4.6,
    inStock: true
  },

  // Smart Home
  {
    id: '23',
    name: 'Amazon Echo Dot (5th Gen)',
    brand: 'Amazon',
    category: 'Smart Home',
    price: 49,
    description: 'Compact smart speaker with Alexa voice assistant.',
    features: ['Alexa built-in', 'Smart home control', 'Music streaming', 'Temperature sensor', 'Routines', 'Compact design'],
    rating: 4.5,
    inStock: true
  },
  {
    id: '24',
    name: 'Google Nest Hub (2nd Gen)',
    brand: 'Google',
    category: 'Smart Home',
    price: 99,
    description: 'Smart display for home control and entertainment.',
    features: ['7-inch display', 'Google Assistant', 'Sleep sensing', 'Smart home control', 'Video calling', 'Photo frame'],
    rating: 4.4,
    inStock: true
  },
  {
    id: '25',
    name: 'Philips Hue Starter Kit',
    brand: 'Philips',
    category: 'Smart Home',
    price: 199,
    description: 'Smart lighting system with color-changing bulbs.',
    features: ['16 million colors', 'Voice control', 'App control', 'Schedules', 'Energy efficient', '4 bulbs + hub'],
    rating: 4.6,
    inStock: true
  },
  {
    id: '26',
    name: 'Nest Learning Thermostat',
    brand: 'Google',
    category: 'Smart Home',
    price: 249,
    description: 'Smart thermostat that learns your schedule and saves energy.',
    features: ['Auto-schedule', 'Energy saving', 'Remote control', 'Works with Alexa', 'Energy reports', 'Easy installation'],
    rating: 4.5,
    inStock: true
  },

  // Gaming
  {
    id: '27',
    name: 'PlayStation 5',
    brand: 'Sony',
    category: 'Gaming',
    price: 499,
    description: 'Next-gen gaming console with ultra-fast SSD and ray tracing.',
    features: ['4K gaming', 'Ray tracing', 'Ultra-fast SSD', 'DualSense controller', 'Backward compatible', '3D audio'],
    rating: 4.8,
    inStock: false
  },
  {
    id: '28',
    name: 'Xbox Series X',
    brand: 'Microsoft',
    category: 'Gaming',
    price: 499,
    description: 'Powerful gaming console with 4K gaming and Game Pass.',
    features: ['4K gaming', '120fps support', 'Quick Resume', 'Game Pass', 'Ray tracing', '1TB SSD'],
    rating: 4.7,
    inStock: true
  },
  {
    id: '29',
    name: 'Nintendo Switch OLED',
    brand: 'Nintendo',
    category: 'Gaming',
    price: 349,
    description: 'Hybrid gaming console with vibrant OLED screen.',
    features: ['7-inch OLED', 'Portable gaming', 'Dock for TV', 'Joy-Con controllers', 'Nintendo exclusives', '64GB storage'],
    rating: 4.6,
    inStock: true
  },
  {
    id: '30',
    name: 'Steam Deck',
    brand: 'Valve',
    category: 'Gaming',
    price: 399,
    description: 'Portable PC gaming device that runs your Steam library.',
    features: ['Portable PC gaming', 'Steam library', '7-inch touchscreen', 'Custom AMD APU', 'Expandable storage', 'Dock compatible'],
    rating: 4.5,
    inStock: true
  },

  // Fitness
  {
    id: '31',
    name: 'Peloton Bike+',
    brand: 'Peloton',
    category: 'Fitness',
    price: 2495,
    description: 'Premium indoor cycling bike with live classes.',
    features: ['23.8-inch rotating screen', 'Live classes', 'Auto-resistance', 'Apple GymKit', 'Metrics tracking', 'Community features'],
    rating: 4.6,
    inStock: true
  },
  {
    id: '32',
    name: 'Mirror Home Gym',
    brand: 'Lululemon',
    category: 'Fitness',
    price: 1495,
    description: 'Interactive fitness mirror with personal training.',
    features: ['Full-length mirror', 'Live classes', 'Personal training', 'Variety of workouts', 'Heart rate monitoring', 'Compact design'],
    rating: 4.4,
    inStock: true
  },
  {
    id: '33',
    name: 'Hydrow Rower',
    brand: 'Hydrow',
    category: 'Fitness',
    price: 2195,
    description: 'Connected rowing machine with on-water workouts.',
    features: ['22-inch touchscreen', 'Live outdoor rows', 'Quiet operation', 'Electromagnetic resistance', 'Full-body workout', 'Compact storage'],
    rating: 4.5,
    inStock: true
  },

  // Kitchen Appliances
  {
    id: '34',
    name: 'Vitamix A3500',
    brand: 'Vitamix',
    category: 'Kitchen',
    price: 599,
    description: 'Professional-grade blender with smart programs.',
    features: ['5 programs', 'Self-cleaning', 'Variable speed', 'Touchscreen', '64oz container', '10-year warranty'],
    rating: 4.8,
    inStock: true
  },
  {
    id: '35',
    name: 'Breville Barista Express',
    brand: 'Breville',
    category: 'Kitchen',
    price: 699,
    description: 'Espresso machine with built-in grinder for cafe-quality coffee.',
    features: ['Built-in grinder', 'Dose control', 'Steam wand', 'Precise temperature', 'Stainless steel', 'Manual microfoam'],
    rating: 4.6,
    inStock: true
  },
  {
    id: '36',
    name: 'Instant Pot Pro Plus',
    brand: 'Instant Pot',
    category: 'Kitchen',
    price: 169,
    description: 'Multi-use pressure cooker with smart programs.',
    features: ['10-in-1 cooker', 'Smart programs', 'Whisper quiet', 'App control', '6-quart capacity', 'Dishwasher safe'],
    rating: 4.5,
    inStock: true
  },
  {
    id: '37',
    name: 'KitchenAid Stand Mixer',
    brand: 'KitchenAid',
    category: 'Kitchen',
    price: 449,
    description: 'Iconic stand mixer for baking and cooking.',
    features: ['5-quart bowl', '10 speeds', 'Tilt-head design', '59-point attachment hub', 'All-metal construction', 'Multiple colors'],
    rating: 4.7,
    inStock: true
  },

  // Office
  {
    id: '38',
    name: 'Herman Miller Aeron',
    brand: 'Herman Miller',
    category: 'Office',
    price: 1395,
    description: 'Ergonomic office chair with advanced support.',
    features: ['8Z Pellicle suspension', 'PostureFit SL', 'Fully adjustable', '12-year warranty', 'Breathable material', 'Tilt limiter'],
    rating: 4.8,
    inStock: true
  },
  {
    id: '39',
    name: 'Uplift Desk V2',
    brand: 'Uplift',
    category: 'Office',
    price: 799,
    description: 'Electric standing desk with memory presets.',
    features: ['Height adjustable', '4 memory presets', 'Stable at all heights', 'Bamboo desktop', 'Cable management', 'Quiet motor'],
    rating: 4.7,
    inStock: true
  },
  {
    id: '40',
    name: 'LG UltraWide Monitor',
    brand: 'LG',
    category: 'Office',
    price: 599,
    description: '34-inch ultrawide monitor for productivity.',
    features: ['34-inch ultrawide', '3440x1440 resolution', 'USB-C connectivity', 'HDR10', 'AMD FreeSync', 'Split screen'],
    rating: 4.6,
    inStock: true
  },

  // Audio Equipment
  {
    id: '41',
    name: 'Sonos Arc',
    brand: 'Sonos',
    category: 'Audio',
    price: 899,
    description: 'Premium soundbar with Dolby Atmos.',
    features: ['Dolby Atmos', '11 drivers', 'Voice control', 'Room tuning', 'HDMI eARC', 'Music streaming'],
    rating: 4.7,
    inStock: true
  },
  {
    id: '42',
    name: 'KEF LS50 Wireless II',
    brand: 'KEF',
    category: 'Audio',
    price: 2799,
    description: 'High-end wireless speakers with audiophile sound.',
    features: ['Uni-Q driver', 'Wireless streaming', 'Room EQ', '24bit/384kHz', 'Multiple inputs', 'App control'],
    rating: 4.8,
    inStock: true
  },

  // Travel
  {
    id: '43',
    name: 'Away Bigger Carry-On',
    brand: 'Away',
    category: 'Travel',
    price: 295,
    description: 'Premium carry-on luggage with built-in charger.',
    features: ['Polycarbonate shell', 'Built-in battery', 'TSA lock', '360° wheels', 'Lifetime warranty', 'Compression system'],
    rating: 4.5,
    inStock: true
  },
  {
    id: '44',
    name: 'Peak Design Travel Backpack',
    brand: 'Peak Design',
    category: 'Travel',
    price: 299,
    description: 'Versatile travel backpack with modular organization.',
    features: ['45L capacity', 'Weatherproof', 'Laptop sleeve', 'Modular packing', 'Hide-away straps', 'Premium materials'],
    rating: 4.6,
    inStock: true
  },

  // Outdoor
  {
    id: '45',
    name: 'Patagonia Nano Puff Jacket',
    brand: 'Patagonia',
    category: 'Outdoor',
    price: 249,
    description: 'Lightweight insulated jacket for outdoor activities.',
    features: ['PrimaLoft insulation', 'Water resistant', 'Packable', 'Recycled materials', 'Fair Trade', 'Lifetime warranty'],
    rating: 4.7,
    inStock: true
  },
  {
    id: '46',
    name: 'YETI Tundra 45 Cooler',
    brand: 'YETI',
    category: 'Outdoor',
    price: 325,
    description: 'Heavy-duty cooler for extended outdoor adventures.',
    features: ['Rotomolded', 'Bear resistant', 'T-Rex lid latches', 'PermaFrost insulation', 'Non-slip feet', '5-year warranty'],
    rating: 4.8,
    inStock: true
  }
];