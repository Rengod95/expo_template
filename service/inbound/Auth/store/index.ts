/**
 * Auth 서비스 스토어
 */

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_STORAGE_KEYS } from '@service/inbound/Auth/consts';
import { UserInterface } from '@service/inbound/Auth/types';

/**
 * Auth 상태 인터페이스
 */
export interface AuthState {
  user: UserInterface | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Auth 스토어 액션 인터페이스
 */
export interface AuthActions {
  setUser: (user: UserInterface | null) => void;
  setToken: (token: string | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

/**
 * Auth 스토어 인터페이스
 */
export type AuthStore = AuthState & AuthActions;

/**
 * Auth 스토어 초기 상태
 */
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

/**
 * Auth 스토어
 */
export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,

  /**
   * 사용자 정보 설정
   */
  setUser: (user: UserInterface | null) => {
    set({ user });
    if (user) {
      AsyncStorage.setItem(AUTH_STORAGE_KEYS.USER, JSON.stringify(user)).catch(console.error);
    } else {
      AsyncStorage.removeItem(AUTH_STORAGE_KEYS.USER).catch(console.error);
    }
  },

  /**
   * 토큰 설정
   */
  setToken: (token: string | null) => {
    set({ token });
    if (token) {
      AsyncStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, token).catch(console.error);
    } else {
      AsyncStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN).catch(console.error);
    }
  },

  /**
   * 인증 상태 설정
   */
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),

  /**
   * 로딩 상태 설정
   */
  setIsLoading: (isLoading: boolean) => set({ isLoading }),

  /**
   * 에러 설정
   */
  setError: (error: string | null) => set({ error }),

  /**
   * 스토어 초기화
   */
  reset: () => {
    set(initialState);
    AsyncStorage.multiRemove([AUTH_STORAGE_KEYS.TOKEN, AUTH_STORAGE_KEYS.USER]).catch(
      console.error,
    );
  },
}));
