/**
 * i18n 서비스 관련 타입 정의
 */

/**
 * 지원하는 언어 코드
 */
export type LanguageCode = 'ko' | 'en';

/**
 * i18n 상태 인터페이스
 */
export interface I18nState {
  currentLanguage: LanguageCode;
  isLoaded: boolean;
  error: string | null;
}

/**
 * i18n 스토어 인터페이스
 */
export interface I18nStore extends I18nState {
  setCurrentLanguage: (language: LanguageCode) => void;
  setIsLoaded: (isLoaded: boolean) => void;
  setError: (error: string | null) => void;
}

/**
 * i18n 리소스 인터페이스
 */
export interface I18nResources {
  [key: string]: {
    [key: string]: string | I18nResources;
  };
}
