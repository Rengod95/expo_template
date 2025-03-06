/**
 * 테마 스토어
 */

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 테마 타입
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * 테마 스토어 상태 인터페이스
 */
interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

/**
 * 테마 스토어 키
 */
const THEME_STORAGE_KEY = 'app_theme';

/**
 * 테마 스토어
 */
export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'system',

  /**
   * 테마 설정
   */
  setTheme: (theme: Theme) => {
    set({ theme });
    AsyncStorage.setItem(THEME_STORAGE_KEY, theme).catch(console.error);
  },
}));

/**
 * 테마 초기화
 */
export const initializeTheme = async (): Promise<void> => {
  try {
    const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
    if (
      storedTheme &&
      (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system')
    ) {
      useThemeStore.setState({ theme: storedTheme as Theme });
    }
  } catch (error) {
    console.error('Error initializing theme:', error);
  }
};
