/**
 * 인증 서비스 어댑터
 *
 * 인증 관련 순수 로직을 처리하는 서비스 어댑터입니다.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { InitializationSingleTon } from '../../../lib/shared';
import { User } from '../types';

// 스토리지 키 상수
const AUTH_TOKEN_KEY = 'auth_token';
const USER_DATA_KEY = 'user_data';

/**
 * 인증 서비스 클래스
 */
export class AuthService extends InitializationSingleTon<AuthService> {
  // 이벤트 리스너
  private authStateChangeListeners: ((isAuthenticated: boolean) => void)[] = [];
  private userChangeListeners: ((user: User | null) => void)[] = [];

  constructor() {
    super();
  }

  /**
   * 인증 상태 변경 리스너 추가
   */
  addAuthStateChangeListener(listener: (isAuthenticated: boolean) => void): () => void {
    this.authStateChangeListeners.push(listener);
    return () => {
      this.authStateChangeListeners = this.authStateChangeListeners.filter((l) => l !== listener);
    };
  }

  /**
   * 사용자 정보 변경 리스너 추가
   */
  addUserChangeListener(listener: (user: User | null) => void): () => void {
    this.userChangeListeners.push(listener);
    return () => {
      this.userChangeListeners = this.userChangeListeners.filter((l) => l !== listener);
    };
  }

  /**
   * 인증 상태 변경 알림
   */
  private notifyAuthStateChange(isAuthenticated: boolean): void {
    this.authStateChangeListeners.forEach((listener) => listener(isAuthenticated));
  }

  /**
   * 사용자 정보 변경 알림
   */
  private notifyUserChange(user: User | null): void {
    this.userChangeListeners.forEach((listener) => listener(user));
  }

  /**
   * 서비스 초기화
   */
  async initialize(): Promise<void> {
    try {
      // 초기화 시 저장된 인증 상태 확인
      const token = await this.getAuthToken();
      const user = await this.getUserData();

      // 인증 상태 알림
      this.notifyAuthStateChange(!!token);
      this.notifyUserChange(user);

      console.log('AuthService initialized');
    } catch (error) {
      console.error('AuthService initialization error:', error);
    }
  }

  /**
   * 저장된 인증 토큰 가져오기
   */
  async getAuthToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to get auth token:', error);
      return null;
    }
  }

  /**
   * 저장된 사용자 정보 가져오기
   */
  async getUserData(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(USER_DATA_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Failed to get user data:', error);
      return null;
    }
  }

  /**
   * 로그인 처리
   */
  async login(email: string, password: string): Promise<{ success: boolean; user?: User }> {
    try {
      // 실제 구현에서는 API 호출로 대체
      // 여기서는 간단한 예시로 이메일이 'test@example.com'이고 비밀번호가 'password'인 경우 성공으로 처리
      if (email === 'test@example.com' && password === 'password') {
        const mockUser: User = {
          id: '1',
          email,
          name: '테스트 사용자',
        };

        // 토큰과 사용자 정보 저장
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, 'mock_token');
        await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(mockUser));

        // 인증 상태 및 사용자 정보 변경 알림
        this.notifyAuthStateChange(true);
        this.notifyUserChange(mockUser);

        return { success: true, user: mockUser };
      }

      return { success: false };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false };
    }
  }

  /**
   * 로그아웃 처리
   */
  async logout(): Promise<boolean> {
    try {
      // 인증 정보 삭제
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
      await AsyncStorage.removeItem(USER_DATA_KEY);

      // 인증 상태 및 사용자 정보 변경 알림
      this.notifyAuthStateChange(false);
      this.notifyUserChange(null);

      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  }

  /**
   * 인증 상태 확인
   */
  async isAuthenticated(): Promise<boolean> {
    const token = await this.getAuthToken();
    return !!token;
  }
}

// 싱글톤 인스턴스
export const authService = AuthService.getInstance();
