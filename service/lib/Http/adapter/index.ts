/**
 * HTTP 서비스 어댑터
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, HTTP_HEADERS, HTTP_TIMEOUT } from '../consts';
import { HttpClient, HttpRequestConfig } from '../types';
import { InitializationSingleTon } from '../../shared';
import serviceMediator from '../../shared';

/**
 * HTTP 클라이언트 클래스
 */
export class HttpService extends InitializationSingleTon<HttpService> implements HttpClient {
  private instance: AxiosInstance;

  constructor() {
    super();
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: HTTP_TIMEOUT,
      headers: HTTP_HEADERS,
    });

    // 서비스 중재자에 등록
    serviceMediator.registerServiceForInitialization(this);
  }

  /**
   * 서비스 초기화
   */
  async initialize(): Promise<void> {
    this.setupInterceptors();
    console.log('HttpService initialized');
  }

  /**
   * 인터셉터 설정
   */
  private setupInterceptors(): void {
    // 요청 인터셉터
    this.instance.interceptors.request.use(
      async (config) => {
        // 토큰이 있으면 헤더에 추가
        try {
          const token = await AsyncStorage.getItem('token');
          if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.error('Error getting token from AsyncStorage:', error);
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // 응답 인터셉터
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        // 에러 처리
        const customError = {
          message: error.message || 'Unknown error occurred',
          status: error.response?.status,
          data: error.response?.data,
        };
        return Promise.reject(customError);
      },
    );
  }

  /**
   * GET 요청
   */
  async get<T = any>(url: string, config?: HttpRequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, this.transformConfig(config));
    return response.data;
  }

  /**
   * POST 요청
   */
  async post<T = any>(url: string, data?: any, config?: HttpRequestConfig): Promise<T> {
    const response = await this.instance.post<T>(url, data, this.transformConfig(config));
    return response.data;
  }

  /**
   * PUT 요청
   */
  async put<T = any>(url: string, data?: any, config?: HttpRequestConfig): Promise<T> {
    const response = await this.instance.put<T>(url, data, this.transformConfig(config));
    return response.data;
  }

  /**
   * DELETE 요청
   */
  async delete<T = any>(url: string, config?: HttpRequestConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, this.transformConfig(config));
    return response.data;
  }

  /**
   * PATCH 요청
   */
  async patch<T = any>(url: string, data?: any, config?: HttpRequestConfig): Promise<T> {
    const response = await this.instance.patch<T>(url, data, this.transformConfig(config));
    return response.data;
  }

  /**
   * 설정 변환
   */
  private transformConfig(config?: HttpRequestConfig): AxiosRequestConfig {
    return config as AxiosRequestConfig;
  }
}

/**
 * HTTP 클라이언트 인스턴스
 * 싱글톤 패턴으로 구현되어 있어 항상 동일한 인스턴스를 반환합니다.
 */
export const httpClient = HttpService.getInstance();

/**
 * HTTP 클라이언트 훅
 */
export const useHttpClient = (): HttpClient => {
  return httpClient;
};
