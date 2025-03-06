/**
 * 인증 관리 훅
 *
 * 이 훅은 인증 서비스와 인증 스토어를 연결하여 애플리케이션의 인증 상태를 관리합니다.
 */

import { useCallback, useEffect } from 'react';
import Constants from 'expo-constants';
import { authService } from '../../service/lib/Auth/adapter';
import { useAuthStore, User } from '../../service/lib/Auth/store';

// 환경 변수에서 인증 사용 여부 확인
const useAuthFeature = Constants.expoConfig?.extra?.useAuth === 'true';

/**
 * 인증 관리 훅
 */
export const useAuth = () => {
  // 인증 스토어에서 상태와 액션 가져오기
  const {
    isAuthenticated,
    isLoading,
    user,
    error,
    setIsAuthenticated,
    setIsLoading,
    setUser,
    setError,
    reset,
  } = useAuthStore();

  /**
   * 서비스 초기화 및 전역 스토어 연결
   */
  const initializeAuthService = useCallback(async () => {
    try {
      // 인증 기능이 비활성화된 경우
      if (!useAuthFeature) {
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }

      // 서비스 초기화 전에 스토어 상태 업데이트
      setIsLoading(true);
      setError(null);

      // 서비스 초기화
      await authService.initialize();
    } catch (error) {
      setError(error instanceof Error ? error.message : '인증 서비스 초기화 중 오류 발생');
      console.error('Auth service initialization error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [setIsAuthenticated, setIsLoading, setError]);

  // 컴포넌트 마운트 시 서비스 초기화 및 이벤트 리스너 등록
  useEffect(() => {
    // 서비스 초기화
    initializeAuthService();

    // 인증 기능이 비활성화된 경우 이벤트 리스너 등록 생략
    if (!useAuthFeature) {
      return;
    }

    // 이벤트 리스너 등록
    const unsubscribeAuth = authService.addAuthStateChangeListener((isAuthenticated) => {
      setIsAuthenticated(isAuthenticated);
    });

    const unsubscribeUser = authService.addUserChangeListener((user) => {
      setUser(user);
    });

    // 컴포넌트 언마운트 시 이벤트 리스너 해제
    return () => {
      unsubscribeAuth();
      unsubscribeUser();
    };
  }, [setIsAuthenticated, setUser, initializeAuthService]);

  /**
   * 로그인 처리
   */
  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      try {
        // 인증 기능이 비활성화된 경우
        if (!useAuthFeature) {
          setIsAuthenticated(true);
          return true;
        }

        setIsLoading(true);
        setError(null);

        const result = await authService.login(email, password);

        if (!result.success) {
          setError('이메일 또는 비밀번호가 올바르지 않습니다.');
          return false;
        }

        return true;
      } catch (error) {
        setError(error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다.');
        console.error('Login error:', error);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [setIsAuthenticated, setIsLoading, setError],
  );

  /**
   * 로그아웃 처리
   */
  const logout = useCallback(async (): Promise<boolean> => {
    try {
      // 인증 기능이 비활성화된 경우
      if (!useAuthFeature) {
        return true;
      }

      setIsLoading(true);
      setError(null);

      const success = await authService.logout();

      if (!success) {
        setError('로그아웃 중 오류가 발생했습니다.');
        return false;
      }

      return true;
    } catch (error) {
      setError(error instanceof Error ? error.message : '로그아웃 중 오류가 발생했습니다.');
      console.error('Logout error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setError]);

  return {
    isAuthenticated,
    isLoading,
    user,
    error,
    login,
    logout,
    initializeAuthService,
  };
};
