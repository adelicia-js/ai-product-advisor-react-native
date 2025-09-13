import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'DMSerifDisplay-Regular': require('../../assets/fonts/DMSerifDisplay-Regular.ttf'),
    'DMSerifDisplay-Italic': require('../../assets/fonts/DMSerifDisplay-Italic.ttf'),
    'Inter-Regular': require('../../assets/fonts/Inter/static/Inter_18pt-Regular.ttf'),
    'Inter-Light': require('../../assets/fonts/Inter/static/Inter_18pt-Light.ttf'),
    'Inter-ExtraLight': require('../../assets/fonts/Inter/static/Inter_18pt-ExtraLight.ttf'),
    'Inter-Bold': require('../../assets/fonts/Inter/static/Inter_18pt-Bold.ttf'),
  });
};

export const fontNames = {
  dmSerifDisplay: 'DMSerifDisplay-Regular',
  dmSerifDisplayItalic: 'DMSerifDisplay-Italic',
  interRegular: 'Inter-Regular',
  interLight: 'Inter-Light',
  interExtraLight: 'Inter-ExtraLight',
  interBold: 'Inter-Bold',
} as const;