import {useFonts} from 'expo-font';

export const useAppFonts = () => {
  const [loaded, error] = useFonts({
    'Pretendard-Bold': require('@/assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-Medium': require('@/assets/fonts/Pretendard-Medium.otf'),
    'Pretendard-Regular': require('@/assets/fonts/Pretendard-Regular.otf'),
    'Pretendard-SemiBold': require('@/assets/fonts/Pretendard-SemiBold.otf'),
    'Pretendard-Thin': require('@/assets/fonts/Pretendard-Thin.otf'),
    'Pretendard-ExtraBold': require('@/assets/fonts/Pretendard-ExtraBold.otf'),
    'Pretendard-ExtraLight': require('@/assets/fonts/Pretendard-ExtraLight.otf'),
    'Pretendard-Light': require('@/assets/fonts/Pretendard-Light.otf'),
    'Pretendard-Black': require('@/assets/fonts/Pretendard-Black.otf'),
  });

  if (error) {
    console.error('Failed to load fonts:', error);
  }

  return {
    isGlobalFontLoaded: loaded,
    hasGlobalFontLoadingError: error,
  };
};
