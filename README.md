# Pickr AI 🛍️

## 🎯 Live Demo

- **Live App (Expo Go):** `exp://u.expo.dev/update/8bc73a13-7e4e-4881-85a4-7cc55f89557b`

## Overview

Pickr AI is a React Native mobile application that leverages artificial intelligence to provide personalized product recommendations based on natural language queries. Users can describe their needs in plain English, and the app intelligently analyzes their requirements to suggest the most suitable products from a curated catalog of tech products.

## ✨ Features

### Core Functionality
- **Natural Language Search**: Describe what you're looking for in plain English
- **AI-Powered Recommendations**: Intelligent product matching using Google Gemini API
- **Smart Relevance Scoring**: Visual indicators showing match quality (90%+, 75%+, etc.)
- **Search History**: Keep track of previous searches for quick access
- **Favorites System**: Save products for later reference (persisted locally)
- **Product Details**: Comprehensive view of product specifications and features

### UI/UX Highlights
- 🎨 **Modern Design**: Gradient-based theme with pink/purple color scheme
- ✨ **Animated Splash Screen**: Professional loading experience with brand animations
- 📱 **Cross-Platform**: Works on iOS, Android, and Web
- 🔄 **Smooth Transitions**: Native navigation with gesture support
- 💾 **Offline Support**: Favorites and history work without internet

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

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Expo Go app on your phone
- Git

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/adelicia-js/product-advisor.git
   cd product-advisor
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   ```bash
   # Create .env file
   cp .env.example .env
   # Add your Gemini API key (optional - app has fallback)
   ```

4. **Run the Application**
   ```bash
   # Start development server
   npx expo start

   # Specific platforms
   npx expo start --ios      # iOS Simulator
   npx expo start --android  # Android Emulator
   npx expo start --web      # Web Browser
   ```

## 📦 Building for Production

### Create Standalone APK (Android)
```bash
# Build APK for distribution
eas build --platform android --profile preview

# The build will be queued on Expo servers (free)
# Takes approximately 10-20 minutes
# You'll receive a download link when complete
```

### Publish Updates (Expo Go)
```bash
# Push updates to existing users
eas update --branch preview --message "Update description"
```

## 📱 Product Catalog

The app includes a comprehensive catalog of 46 tech products across multiple categories:
- **Laptops**: MacBook Air, Dell XPS, ThinkPad, HP Spectre, ASUS ROG
- **Smartphones**: iPhone 15 Pro, Samsung Galaxy S24, Google Pixel 8
- **Audio**: AirPods Pro, Sony WH-1000XM5, Bose QuietComfort
- **Tablets**: iPad Pro, Samsung Galaxy Tab, Surface Pro
- **Smart Home**: Echo Dot, Nest Hub, Philips Hue
- **Gaming**: PlayStation 5, Xbox Series X, Nintendo Switch, Steam Deck
- **Wearables**: Apple Watch, Samsung Galaxy Watch, Garmin Fenix
- **And More**: Cameras, Kitchen Appliances, Office Equipment, Fitness Gear

## 🛠️ Tech Stack

### Core Technologies
- **React Native 0.81.4**: Cross-platform mobile development
- **Expo SDK 54**: Managed workflow with OTA updates
- **TypeScript 5.9**: Type-safe code with full IntelliSense
- **React 19.1**: Latest React features and hooks

### Key Libraries
- **React Navigation**: Stack & Tab navigation with gesture support
- **Expo Linear Gradient**: Beautiful gradient backgrounds
- **AsyncStorage**: Persistent local storage
- **React Native Safe Area Context**: Device-safe layouts
- **Expo Vector Icons**: Ionicons for UI elements

### AI Integration
- **Google Gemini 1.5 Flash**: Natural language processing
- **Fallback System**: Intelligent mock responses when offline

### Development Tools
- **EAS Build**: Cloud-based app building
- **Babel**: Modern JavaScript transpilation
- **Metro**: Fast JavaScript bundler

## 🧪 Testing the App

### Example Queries to Try
- "Looking for a lightweight laptop for programming"
- "Need noise-canceling headphones for work"
- "Best smartphone with great camera under $1000"
- "Smart watch for fitness tracking and notifications"
- "Tablet for digital art and note-taking"
- "Gaming console for family entertainment"

### How to Access
- Install Expo Go from App Store/Play Store
- Open link: `exp://u.expo.dev/update/8bc73a13-7e4e-4881-85a4-7cc55f89557b`

## 🎨 Design Philosophy

- **Gradient-First**: Pink/purple gradients create visual hierarchy
- **Typography Mix**: DMSerif Display for headers, Inter for body text
- **Card-Based Layout**: Easy scanning on mobile devices
- **Visual Feedback**: Loading animations and state transitions
- **Accessibility**: High contrast text, clear touch targets

## 📂 Project Structure

```
product-advisor/
├── src/
│   ├── screens/          # App screens (Search, Results, etc.)
│   ├── components/       # Reusable components
│   ├── services/         # API and storage services
│   ├── data/            # Product catalog
│   ├── theme/           # Colors, typography, spacing
│   ├── types/           # TypeScript interfaces
│   └── utils/           # Helper functions
├── assets/              # Images and fonts
├── App.tsx             # Main app with navigation
├── app.json            # Expo configuration
├── eas.json            # EAS Build config
└── babel.config.js     # Babel configuration
```

## 🔑 Environment Variables

```env
# .env file
GEMINI_API_KEY=your_api_key_here  # Optional - app has fallback
```

## ⚠️ Important Disclaimer

**This is a frontend demonstration project showcasing React Native and UI/UX development skills.**

The app does **NOT** support:
- Real payment processing or purchases
- Actual product ordering
- Backend order management
- User authentication/accounts
- Live inventory tracking
- Real transactions of any kind

All products and prices are for demonstration purposes only.