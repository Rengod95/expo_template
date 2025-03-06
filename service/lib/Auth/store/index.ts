/**
 * 인증 상태 관리 스토어
 */

import { create } from 'zustand';

/**
 * 사용자 타입
 */
export type User = {
  id: string;
  email: string;
  name: string;
};

/**
 * 인증 상태 타입
 */
export type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
};

/**
 * 인증 스토어 액션 타입
 */
type AuthActions = {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  reset: () => void;
};

/**
 * 인증 스토어 초기 상태
 */
const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null,
};

/**
 * 인증 스토어 생성
 */
export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  ...initialState,

  /**
   * 인증 상태 설정
   */
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),

  /**
   * 로딩 상태 설정
   */
  setIsLoading: (isLoading: boolean) => set({ isLoading }),

  /**
   * 사용자 정보 설정
   */
  setUser: (user: User | null) => set({ user }),

  /**
   * 에러 상태 설정
   */
  setError: (error: string | null) => set({ error }),

  /**
   * 상태 초기화
   */
  reset: () => set(initialState),
}));
