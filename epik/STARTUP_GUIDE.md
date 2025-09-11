# Product Advisor - Application Startup Guide

## Prerequisites

Before starting the application, ensure you have the following installed:

1. **Node.js** (v18.0.0 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

3. **Expo Go** mobile app (for testing on physical devices)
   - iOS: Download from App Store
   - Android: Download from Google Play Store

## Initial Setup

### Step 1: Clone or Navigate to Project
```bash
cd product-advisor
```

### Step 2: Install Dependencies
```bash
npm install
```
This will install all required packages including:
- React Native and Expo
- Navigation libraries
- AsyncStorage for local data
- TypeScript support

### Step 3: Configure AI Service (Optional)
To enable real AI-powered recommendations:

1. Open `src/services/aiService.ts`
2. Replace `YOUR_GEMINI_API_KEY` with your Google Gemini API key
3. Get a free API key at: https://makersuite.google.com/app/apikey

**Note:** If you skip this step, the app will use intelligent mock recommendations that still provide a great demo experience.

## Starting the Application

### Option 1: Using Expo Go (Recommended for Quick Testing)
```bash
npm start
```
This will:
1. Start the Expo development server
2. Display a QR code in your terminal
3. Open Expo DevTools in your browser

**To run on your device:**
- **iOS**: Open Camera app, scan QR code, tap notification to open in Expo Go
- **Android**: Open Expo Go app, tap "Scan QR code", scan the code

### Option 2: Platform-Specific Commands

#### For iOS Simulator (Mac only)
```bash
npm run ios
```
Requirements: Xcode and iOS Simulator installed

#### For Android Emulator
```bash
npm run android
```
Requirements: Android Studio and Android emulator configured

#### For Web Browser
```bash
npm run web
```
Opens the app in your default web browser

## Common Startup Issues & Solutions

### Issue: "Unable to resolve module" error
**Solution:**
```bash
npm install
npx expo install --fix
```

### Issue: Metro bundler not starting
**Solution:**
```bash
npx expo start --clear
```

### Issue: App not loading on device
**Solutions:**
1. Ensure device is on same WiFi network as computer
2. Check firewall settings aren't blocking port 19000
3. Try using tunnel mode: `npx expo start --tunnel`

### Issue: "Network response timed out"
**Solution:**
Increase timeout in Metro config or use cable connection instead of WiFi

## Development Workflow

### Hot Reloading
- The app automatically reloads when you save changes
- Shake device or press `r` in terminal to manually reload

### Debugging
- Shake device or press `d` in terminal to open developer menu
- Use React Native Debugger or Chrome DevTools

### Viewing Logs
- Terminal shows console.log outputs
- Use `npx expo start --dev-client` for more detailed logs

## Quick Start Commands Summary

```bash
# Install dependencies (first time only)
npm install

# Start with Expo Go
npm start

# Platform-specific starts
npm run ios      # iOS Simulator
npm run android  # Android Emulator  
npm run web      # Web Browser

# Clear cache and restart
npx expo start --clear

# Use tunnel for network issues
npx expo start --tunnel
```

## Testing the App

Once running, try these sample queries:
1. "I need a laptop for programming"
2. "Best wireless headphones for workouts"
3. "Smart home devices under $200"
4. "Gaming console for kids"

## Stopping the Application

- Press `Ctrl+C` (Windows/Linux) or `Cmd+C` (Mac) in the terminal
- Or press `q` in the Expo terminal interface

## Next Steps

- Explore the app features: Search, Results, Product Details
- Check search history and favorites functionality
- Review `README.md` for architecture details
- Customize the product catalog in `src/data/products.ts`

## Support

For issues or questions:
1. Check the console for error messages
2. Review the README.md for detailed documentation
3. Ensure all prerequisites are properly installed
4. Try clearing cache with `npx expo start --clear`