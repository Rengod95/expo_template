/**
 * HTTP 서비스 관련 타입 정의
 */

export interface HttpResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface HttpError {
  message: string;
  status?: number;
  data?: any;
}

export interface HttpRequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
  withCredentials?: boolean;
}

export interface HttpClient {
  get<T = any>(url: string, config?: HttpRequestConfig): Promise<T>;
  post<T = any>(url: string, data?: any, config?: HttpRequestConfig): Promise<T>;
  put<T = any>(url: string, data?: any, config?: HttpRequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: HttpRequestConfig): Promise<T>;
  patch<T = any>(url: string, data?: any, config?: HttpRequestConfig): Promise<T>;
}
