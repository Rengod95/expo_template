/**
 * Auth 서비스 관련 타입 정의
 */

export interface UserInterface {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: UserInterface;
  token: string;
}

export interface AuthState {
  user: UserInterface | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
