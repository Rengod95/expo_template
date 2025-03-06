/**
 * Auth 서비스 어댑터
 */

import { useCallback } from 'react';
import { AuthCredentials, AuthResponse, UserInterface } from '../types';
import { AUTH_ENDPOINTS, AUTH_ERRORS } from '../consts';
import { useAuthStore } from '../store';
import { httpClient } from '../../../lib/Http/adapter';
import { InitializationSingleTon } from '../../../lib/shared';
import serviceMediator from '../../../lib/shared';

/**
 * Auth 서비스 클래스
 */
export class AuthService extends InitializationSingleTon<AuthService> {
  constructor() {
    super();
    // 서비스 중재자에 등록
    serviceMediator.registerServiceForInitialization(this);
  }

  /**
   * 서비스 초기화
   */
  async initialize(): Promise<void> {
    console.log('AuthService initialized');
    // 필요한 초기화 작업 수행
    try {
      // 저장된 토큰이 있으면 사용자 정보 조회
      const token = await this.getStoredToken();
      if (token) {
        await this.getMe();
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
    }
  }

  /**
   * 저장된 토큰 조회
   */
  private async getStoredToken(): Promise<string | null> {
    try {
      const authStore = useAuthStore.getState();
      return authStore.token;
    } catch (error) {
      console.error('Error getting stored token:', error);
      return null;
    }
  }

  /**
   * 로그인
   */
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    try {
      const response = await httpClient.post<AuthResponse>(AUTH_ENDPOINTS.LOGIN, credentials);
      return response;
    } catch (error: any) {
      if (error.status === 401) {
        throw new Error(AUTH_ERRORS.INVALID_CREDENTIALS);
      } else if (error.status === 0) {
        throw new Error(AUTH_ERRORS.NETWORK_ERROR);
      }
      throw new Error(error.message || AUTH_ERRORS.UNKNOWN_ERROR);
    }
  }

  /**
   * 회원가입
   */
  async register(userData: AuthCredentials & { name: string }): Promise<AuthResponse> {
    try {
      const response = await httpClient.post<AuthResponse>(AUTH_ENDPOINTS.REGISTER, userData);
      return response;
    } catch (error: any) {
      if (error.status === 0) {
        throw new Error(AUTH_ERRORS.NETWORK_ERROR);
      }
      throw new Error(error.message || AUTH_ERRORS.UNKNOWN_ERROR);
    }
  }

  /**
   * 로그아웃
   */
  async logout(): Promise<void> {
    try {
      await httpClient.post(AUTH_ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  /**
   * 사용자 정보 조회
   */
  async getMe(): Promise<UserInterface> {
    try {
      const response = await httpClient.get<UserInterface>(AUTH_ENDPOINTS.ME);
      return response;
    } catch (error: any) {
      if (error.status === 401) {
        throw new Error(AUTH_ERRORS.UNAUTHORIZED);
      } else if (error.status === 0) {
        throw new Error(AUTH_ERRORS.NETWORK_ERROR);
      }
      throw new Error(error.message || AUTH_ERRORS.UNKNOWN_ERROR);
    }
  }
}

/**
 * Auth 서비스 인스턴스
 */
export const authService = AuthService.getInstance();

/**
 * Auth 서비스 훅
 */
export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    setUser,
    setToken,
    setIsAuthenticated,
    setIsLoading,
    setError,
    reset,
  } = useAuthStore();

  /**
   * 로그인
   */
  const login = useCallback(
    async (credentials: AuthCredentials) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await authService.login(credentials);
        setUser(response.user);
        setToken(response.token);
        setIsAuthenticated(true);
        return response;
      } catch (error: any) {
        setError(error.message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setError, setUser, setToken, setIsAuthenticated],
  );

  /**
   * 회원가입
   */
  const register = useCallback(
    async (userData: AuthCredentials & { name: string }) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await authService.register(userData);
        setUser(response.user);
        setToken(response.token);
        setIsAuthenticated(true);
        return response;
      } catch (error: any) {
        setError(error.message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setError, setUser, setToken, setIsAuthenticated],
  );

  /**
   * 로그아웃
   */
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authService.logout();
    } finally {
      reset();
      setIsLoading(false);
    }
  }, [reset, setIsLoading]);

  /**
   * 사용자 정보 조회
   */
  const getMe = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await authService.getMe();
      setUser(userData);
      setIsAuthenticated(true);
      return userData;
    } catch (error: any) {
      setError(error.message);
      if (error.message === AUTH_ERRORS.UNAUTHORIZED) {
        reset();
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setError, setUser, setIsAuthenticated, reset]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    getMe,
  };
};
