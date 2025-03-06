/**
 * i18n 서비스 어댑터
 */

import { useCallback } from 'react';
import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import { Platform, NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { InitializationSingleTon } from '@service/lib/shared';
import { LanguageCode } from '@service/lib/I18n/types';

import * as Localization from 'expo-localization';

import {
  DEFAULT_LANGUAGE,
  I18N_INIT_OPTIONS,
  I18N_STORAGE_KEY,
  LANGUAGE_FILE_EXTENSION,
  LANGUAGE_FILE_PATH,
  SUPPORTED_LANGUAGES,
} from '@service/lib/I18n/consts';

/**
 * i18n 서비스 클래스
 */
export class I18nService extends InitializationSingleTon<I18nService> {
  private _currentLanguage: LanguageCode = DEFAULT_LANGUAGE;
  private _isLoaded: boolean = false;
  private _error: string | null = null;

  // 이벤트 리스너
  private languageChangeListeners: ((language: LanguageCode) => void)[] = [];
  private loadStateChangeListeners: ((isLoaded: boolean) => void)[] = [];
  private errorChangeListeners: ((error: string | null) => void)[] = [];



  constructor() {
    super();
    // 생성자에서는 최소한의 초기화만 수행
  }

  /**
   * 현재 언어 코드 반환
   */
  get currentLanguage(): LanguageCode {
    return this._currentLanguage;
  }

  /**
   * 로드 상태 반환
   */
  get isLoaded(): boolean {
    return this._isLoaded;
  }

  /**
   * 에러 상태 반환
   */
  get error(): string | null {
    return this._error;
  }

  /**
   * 언어 변경 리스너 추가
   */
  addLanguageChangeListener(listener: (language: LanguageCode) => void): () => void {
    this.languageChangeListeners.push(listener);
    return () => {
      this.languageChangeListeners = this.languageChangeListeners.filter((l) => l !== listener);
    };
  }

  /**
   * 로드 상태 변경 리스너 추가
   */
  addLoadStateChangeListener(listener: (isLoaded: boolean) => void): () => void {
    this.loadStateChangeListeners.push(listener);
    return () => {
      this.loadStateChangeListeners = this.loadStateChangeListeners.filter((l) => l !== listener);
    };
  }

  /**
   * 에러 상태 변경 리스너 추가
   */
  addErrorChangeListener(listener: (error: string | null) => void): () => void {
    this.errorChangeListeners.push(listener);
    return () => {
      this.errorChangeListeners = this.errorChangeListeners.filter((l) => l !== listener);
    };
  }

  /**
   * 현재 언어 설정
   */
  private setCurrentLanguage(language: LanguageCode): void {
    this._currentLanguage = language;
    // 리스너에게 알림
    this.languageChangeListeners.forEach((listener) => listener(language));
  }

  /**
   * 로드 상태 설정
   */
  private setIsLoaded(isLoaded: boolean): void {
    this._isLoaded = isLoaded;
    // 리스너에게 알림
    this.loadStateChangeListeners.forEach((listener) => listener(isLoaded));
  }

  /**
   * 에러 상태 설정
   */
  private setError(error: string | null): void {
    this._error = error;
    // 리스너에게 알림
    this.errorChangeListeners.forEach((listener) => listener(error));
  }

  /**
   * i18n 서비스 초기화
   * InitializationSingleTon의 initialize 메서드를 오버라이드
   */
  async initialize(): Promise<void> {
    try {
      this.setIsLoaded(false);
      this.setError(null);

      // i18next 초기화 - 생성자에서 이동
      await i18next.use(initReactI18next).init(I18N_INIT_OPTIONS);

      // 저장된 언어 설정 확인
      const storedLanguage = await this.getStoredLanguage();

      // 기기 언어 확인
      const deviceLanguage = this.getDeviceLanguage();

      // 언어 결정 (저장된 언어 > 기기 언어 > 기본 언어)
      let targetLanguage: LanguageCode;

      if (storedLanguage && SUPPORTED_LANGUAGES.includes(storedLanguage)) {
        targetLanguage = storedLanguage;
      } else if (SUPPORTED_LANGUAGES.includes(deviceLanguage as LanguageCode)) {
        targetLanguage = deviceLanguage as LanguageCode;
      } else {
        targetLanguage = DEFAULT_LANGUAGE;
      }

      // 언어 리소스 로드
      await this.loadLanguageResources(targetLanguage);

      // 현재 언어 설정
      this.setCurrentLanguage(targetLanguage);
      this.setIsLoaded(true);
    } catch (error) {
      this.setError(error instanceof Error ? error.message : '초기화 중 오류 발생');
      console.error('I18n initialization error:', error);
    }
  }

  /**
   * 저장된 언어 설정 가져오기
   */
  private async getStoredLanguage(): Promise<LanguageCode | null> {
    try {
      const storedLanguage = await AsyncStorage.getItem(I18N_STORAGE_KEY);
      if (storedLanguage && SUPPORTED_LANGUAGES.includes(storedLanguage as LanguageCode)) {
        return storedLanguage as LanguageCode;
      }
      return null;
    } catch (error) {
      console.warn('Failed to get stored language:', error);
      return null;
    }
  }

  /**
   * 기기 언어 가져오기
   */
  private getDeviceLanguage(): string {
    // 기본값
    return Localization.getLocales()[0].languageCode || DEFAULT_LANGUAGE;
  }

  /**
   * 언어 리소스 로드
   */
  async loadLanguageResources(language: LanguageCode): Promise<void> {
    try {
      const filePath = `${LANGUAGE_FILE_PATH}/${language}${LANGUAGE_FILE_EXTENSION}`;

      // 파일 존재 여부 확인
      const fileInfo = await FileSystem.getInfoAsync(filePath);

      if (!fileInfo.exists) {
        throw new Error(`Language file not found: ${filePath}`);
      }

      // 파일 읽기
      const content = await FileSystem.readAsStringAsync(filePath);
      const resources = JSON.parse(content);

      // i18next에 리소스 추가
      i18next.addResourceBundle(language, 'translation', resources, true, true);

      // 언어 변경
      await i18next.changeLanguage(language);

      // 언어 설정 저장
      await AsyncStorage.setItem(I18N_STORAGE_KEY, language);
    } catch (error) {
      throw new Error(
        `Failed to load language resources: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  /**
   * 언어 변경
   */
  async changeLanguage(language: LanguageCode): Promise<void> {
    try {
      this.setError(null);

      // 지원하는 언어인지 확인
      if (!SUPPORTED_LANGUAGES.includes(language)) {
        throw new Error(`Unsupported language: ${language}`);
      }

      // 언어 리소스 로드
      await this.loadLanguageResources(language);

      // 현재 언어 설정
      this.setCurrentLanguage(language);
    } catch (error) {
      this.setError(error instanceof Error ? error.message : `언어 변경 중 오류 발생: ${language}`);
      console.error(`Language change error (${language}):`, error);
    }
  }
}

// 싱글톤 인스턴스
export const i18nService = I18nService.getInstance();

/**
 * i18n 훅
 */
export const useI18n = () => {
  const { t, i18n } = useTranslation();

  const translate = useCallback(
    (key: string, options?: any) => {
      return t(key, options);
    },
    [t],
  );

  return {
    t: translate,
    i18n,
  };
};
