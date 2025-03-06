/**
 * HTTP 서비스 관련 상수
 */

export const API_BASE_URL = 'https://api.example.com';

export const HTTP_TIMEOUT = 10000; // 10 seconds

export const HTTP_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
