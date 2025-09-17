import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { colors, typography, spacing } from '../theme/colors';

export const AnimatedLoader = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Dots animation
    const dotAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(dot1, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dot2, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dot3, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(dot1, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot2, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot3, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    // Pulse animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    dotAnimation.start();
    pulseAnimation.start();

    return () => {
      dotAnimation.stop();
      pulseAnimation.stop();
    };
  }, []);

  const getDotStyle = (animValue: Animated.Value) => ({
    opacity: animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    }),
    transform: [
      {
        scale: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.3],
        }),
      },
    ],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.pulseContainer, { transform: [{ scale: pulseAnim }] }]}>
        <View style={styles.dotsContainer}>
          <Animated.View style={[styles.dot, getDotStyle(dot1)]} />
          <Animated.View style={[styles.dot, getDotStyle(dot2)]} />
          <Animated.View style={[styles.dot, getDotStyle(dot3)]} />
        </View>
      </Animated.View>
      <Text style={styles.text}>Analyzing your requirements</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  pulseContainer: {
    padding: spacing.sm,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.text.white,
  },
  text: {
    color: colors.text.white,
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.light,
    letterSpacing: 0.5,
  },
});