/**
 * i18n 서비스 스토어
 */

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_LANGUAGE, I18N_STORAGE_KEY } from '@service/lib/I18n/consts';
import { LanguageCode } from '@service/lib/I18n/types';

/**
 * i18n 상태 인터페이스
 */
export interface I18nState {
  currentLanguage: LanguageCode;
  isLoaded: boolean;
  error: string | null;
}

/**
 * i18n 액션 인터페이스
 */
export interface I18nActions {
  setCurrentLanguage: (language: LanguageCode) => void;
  setIsLoaded: (isLoaded: boolean) => void;
  setError: (error: string | null) => void;
}

/**
 * i18n 스토어 타입
 */
export type I18nStore = I18nState & I18nActions;

/**
 * i18n 스토어 초기 상태
 */
const initialState: I18nState = {
  currentLanguage: DEFAULT_LANGUAGE,
  isLoaded: false,
  error: null,
};

/**
 * i18n 스토어
 */
export const useI18nStore = create<I18nStore>((set) => ({
  ...initialState,

  /**
   * 현재 언어 설정
   */
  setCurrentLanguage: (language: LanguageCode) => {
    set({ currentLanguage: language });
    AsyncStorage.setItem(I18N_STORAGE_KEY, language).catch(console.error);
  },

  /**
   * 로드 상태 설정
   */
  setIsLoaded: (isLoaded: boolean) => set({ isLoaded }),

  /**
   * 에러 설정
   */
  setError: (error: string | null) => set({ error }),
}));
