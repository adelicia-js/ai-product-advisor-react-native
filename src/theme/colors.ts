import { Platform } from "react-native";
import { fontNames } from "../utils/fonts";

export const colors = {
  // Pastel green primary colors
  primary: "#8FBC8F", // Dark Sea Green
  primaryLight: "#98D8C8", // Mint Green
  primaryDark: "#7BA05B", // Sage Green

  // Secondary pastel colors
  secondary: "#F7FFE0", // Very light green/cream
  secondaryLight: "#FDFFF5", // Almost white with green tint

  // Gradients
  gradients: {
    primary: ["#98D8C8", "#8FBC8F"] as const,
    secondary: ["#F7FFE0", "#E6F3E6"] as const,
    card: ["#b4d2b8ba", "#93a16885"] as const,
    button: ["#8FBC8F", "#7BA05B"] as const,
    accent: ["#B4E7CE", "#98D8C8"] as const,
  },

  // Text colors
  text: {
    primary: "#2F4F2F", // Dark Forest Green
    secondary: "#556B55", // Medium Forest Green
    tertiary: "#708B70", // Light Forest Green
    light: "#8A9A8A", // Very Light Forest Green
    white: "#FFFFFF",
  },

  // Background colors
  background: {
    main: "#FDFFF5", // Very light cream
    card: "#FFFFFF",
    input: "#F7FFE0",
    overlay: "rgba(47, 79, 47, 0.1)",
  },

  // Status colors
  success: "#7BA05B",
  warning: "#DAA520",
  error: "#CD5C5C",
  info: "#98D8C8",

  // Shadow colors
  shadow: {
    light: "rgba(143, 188, 143, 0.15)",
    medium: "rgba(143, 188, 143, 0.25)",
    dark: "rgba(47, 79, 47, 0.3)",
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 999,
};

export const typography = {
  fontFamily: {
    primary: fontNames.interRegular,
    secondary: fontNames.dmSerifDisplay,
    bold: fontNames.interBold,
    light: fontNames.interLight,
    extraLight: fontNames.interExtraLight,
    italic: fontNames.dmSerifDisplayItalic,
  },
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    xxxl: 24,
    hero: 28,
    display: 32,
  },
  fontWeight: {
    light: "300" as const,
    regular: "400" as const,
    medium: "500" as const,
    semiBold: "600" as const,
    bold: "700" as const,
    black: "900" as const,
  },
};

export const elevation = {
  sm: {
    shadowColor: colors.shadow.light,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  md: {
    shadowColor: colors.shadow.medium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6,
  },
  lg: {
    shadowColor: colors.shadow.dark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 12,
  },
};
