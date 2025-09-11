# AI Product Advisor - React Native Application

## Overview

AI Product Advisor is a React Native mobile application that leverages artificial intelligence to provide personalized product recommendations based on natural language queries. Users can describe their needs in plain English, and the app intelligently analyzes their requirements to suggest the most suitable products from a comprehensive catalog.

## Features

- **Natural Language Search**: Describe what you're looking for in plain English
- **AI-Powered Recommendations**: Intelligent product matching using Google Gemini API
- **Detailed Explanations**: Understand why each product was recommended
- **Search History**: Keep track of previous searches for quick access
- **Favorites System**: Save products for later reference
- **Product Details**: Comprehensive view of product specifications and features
- **Relevance Scoring**: See how well each product matches your needs

## Architecture

### Component Structure

```
App.tsx                 # Main application entry with navigation setup
├── screens/
│   ├── SearchScreen    # Main search interface with query input
│   ├── ResultsScreen   # Display AI recommendations with reasoning
│   └── ProductDetailScreen # Detailed product information view
├── services/
│   ├── aiService       # AI integration for product recommendations
│   └── storageService  # Local storage for history and favorites
├── data/
│   └── products        # Comprehensive product catalog (46 products)
└── types/
    └── index           # TypeScript type definitions
```

### Data Flow

1. **User Input**: Natural language query entered in SearchScreen
2. **AI Processing**: Query sent to AI service with product catalog context
3. **Recommendation Generation**: AI analyzes query and returns matched products
4. **Results Display**: Recommendations shown with relevance scores and reasoning
5. **Product Details**: Users can view detailed information for each product
6. **Data Persistence**: Search history and favorites stored locally

## Key Design Decisions

### AI Integration
- **Mock Recommendations**: Implemented intelligent fallback system for demo purposes when API key is not available
- **Structured Prompts**: Carefully crafted prompts ensure consistent, high-quality recommendations
- **Error Handling**: Graceful degradation to mock data if AI service fails

### User Experience
- **Intuitive Interface**: Clean, modern design with clear visual hierarchy
- **Quick Actions**: Suggestion examples for easy exploration
- **Visual Feedback**: Loading states and animations for smooth interactions
- **Relevance Indicators**: Color-coded matching scores for quick assessment

### Performance Optimization
- **Lazy Loading**: Components loaded on demand for faster initial load
- **Caching Strategy**: Recent searches stored for quick access
- **Efficient Rendering**: Optimized list rendering for smooth scrolling

### State Management
- **Local State**: React hooks for component-level state
- **Async Storage**: Persistent storage for user preferences and history
- **Navigation State**: React Navigation for seamless screen transitions

## File Structure

```
product-advisor/
├── App.tsx                     # Main app component with navigation
├── src/
│   ├── screens/
│   │   ├── SearchScreen.tsx    # Search interface component
│   │   ├── ResultsScreen.tsx   # Results display component
│   │   └── ProductDetailScreen.tsx # Product details component
│   ├── services/
│   │   ├── aiService.ts        # AI service integration
│   │   └── storageService.ts   # Local storage service
│   ├── data/
│   │   └── products.ts         # Product catalog data
│   └── types/
│       └── index.ts            # TypeScript type definitions
├── package.json                # Project dependencies
└── README.md                   # Project documentation
```

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd product-advisor
   npm install
   ```

2. **Configure AI Service**
   - The app is configured with a Google Gemini API key
   - If the API fails, the app will automatically fallback to intelligent mock recommendations

3. **Run the Application**
   ```bash
   # For Expo Go
   npm start
   
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   
   # For Web
   npm run web
   ```

## Product Catalog

The app includes a comprehensive catalog of 46 products across 14 categories:
- **Technology**: Laptops, Smartphones, Tablets, Cameras
- **Audio**: Headphones, Speakers, Soundbars
- **Smart Home**: Voice assistants, Smart lighting, Thermostats
- **Gaming**: Consoles, Gaming laptops
- **Fitness**: Exercise equipment, Smart fitness devices
- **Office**: Ergonomic furniture, Monitors
- **Kitchen**: Premium appliances
- **Travel & Outdoor**: Luggage, Outdoor gear

## Technologies Used

- **React Native**: Cross-platform mobile development
- **TypeScript**: Type-safe code with better IDE support
- **Expo**: Simplified React Native development and deployment
- **React Navigation**: Native navigation experience
- **AsyncStorage**: Local data persistence
- **Google Gemini API**: Advanced AI for natural language processing

## Testing Recommendations

Try these example queries to explore the app's capabilities:
- "I need a lightweight laptop for travel with long battery life"
- "Best noise-cancelling headphones under $400"
- "Gaming console for family entertainment"
- "Smart home devices for beginners"
- "Professional camera for photography"

## Future Enhancements

- Image recognition for visual product search
- Voice input for hands-free searching
- Price tracking and alerts
- Comparison feature for multiple products
- User reviews and ratings integration
- Personalized recommendations based on search history

## Development Notes

- The app gracefully handles API failures with fallback to mock data
- Search history is limited to 20 most recent queries
- All product data is stored locally for offline access
- The UI is optimized for both iOS and Android platforms