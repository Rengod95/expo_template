/**
 * Auth 서비스 관련 상수
 */

export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh-token',
  ME: '/auth/me',
};

export const AUTH_STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
};

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: '이메일 또는 비밀번호가 올바르지 않습니다.',
  NETWORK_ERROR: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
  UNAUTHORIZED: '인증되지 않은 사용자입니다.',
  UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다.',
};
