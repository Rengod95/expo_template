/**
 * Auth 서비스 타입 정의
 */

/**
 * 사용자 인터페이스
 */
export interface UserInterface {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 인증 토큰 타입
 */
export type AuthToken = string;

/**
 * 로그인 요청 인터페이스
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * 회원가입 요청 인터페이스
 */
export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

/**
 * 비밀번호 변경 요청 인터페이스
 */
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

/**
 * 비밀번호 재설정 요청 인터페이스
 */
export interface ResetPasswordRequest {
  email: string;
}

/**
 * 인증 응답 인터페이스
 */
export interface AuthResponse {
  user: UserInterface;
  token: AuthToken;
}

/**
 * Auth 서비스 인터페이스
 */
export interface AuthServiceInterface {
  login(request: LoginRequest): Promise<AuthResponse>;
  signup(request: SignupRequest): Promise<AuthResponse>;
  logout(): Promise<void>;
  changePassword(request: ChangePasswordRequest): Promise<void>;
  resetPassword(request: ResetPasswordRequest): Promise<void>;

  getCurrentUser(): Promise<UserInterface | null>;
  isAuthenticated(): Promise<boolean>;
}
