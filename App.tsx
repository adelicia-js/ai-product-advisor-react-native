import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from './src/theme/colors';
import { SearchScreen } from './src/screens/SearchScreen';
import { ResultsScreen } from './src/screens/ResultsScreen';
import { ProductDetailScreen } from './src/screens/ProductDetailScreen';
import { FavoritesScreen } from './src/screens/FavoritesScreen';
import { SplashScreen } from './src/screens/SplashScreen';
import { loadFonts, fontNames } from './src/utils/fonts';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function SearchStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Remove redundant headers
      }}
    >
      <Stack.Screen 
        name="SearchHome" 
        component={SearchScreen}
      />
      <Stack.Screen 
        name="Results" 
        component={ResultsScreen}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.text.white,
          headerTitleStyle: { fontFamily: fontNames.dmSerifDisplay, fontSize: 24, marginBottom: 4 },
          title: 'Recommendations'
        }}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.text.white,
          headerTitleStyle: { fontFamily: fontNames.dmSerifDisplay, fontSize: 24, marginBottom: 4 },
          title: 'Product Details'
        }}
      />
    </Stack.Navigator>
  );
}

function FavoritesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Remove redundant headers
      }}
    >
      <Stack.Screen 
        name="FavoritesHome" 
        component={FavoritesScreen}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.text.white,
          headerTitleStyle: { fontWeight: 'bold' },
          title: 'Product Details'
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const loadAppFonts = async () => {
      try {
        await loadFonts();
        setFontsLoaded(true);
        // Keep splash screen for a bit longer for smooth transition
        setTimeout(() => {
          setShowSplash(false);
        }, 2500);
      } catch (error) {
        console.error('Font loading error:', error);
        setFontsLoaded(true);
        setTimeout(() => {
          setShowSplash(false);
        }, 2500);
      }
    };
    loadAppFonts();
  }, []);

  if (!fontsLoaded || showSplash) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.text.light,
          tabBarStyle: {
            backgroundColor: colors.background.card,
            paddingBottom: 8,
            paddingTop: 8,
            height: 80,
            borderTopWidth: 0,
            shadowColor: colors.shadow.medium,
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 10,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginTop: 2,
            fontFamily: fontNames.dmSerifDisplay,
          },
          headerShown: false,
        }}
      >
        <Tab.Screen 
          name="Search" 
          component={SearchStack}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons 
                name={focused ? "search" : "search-outline"} 
                size={24} 
                color={color} 
              />
            ),
          }}
        />
        <Tab.Screen 
          name="Favorites" 
          component={FavoritesStack}
          options={{
            tabBarLabel: 'Favorites',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons 
                name={focused ? "heart" : "heart-outline"} 
                size={24} 
                color={color} 
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.main,
  },
  loadingText: {
    fontSize: 18,
    color: colors.text.primary,
  },
});
