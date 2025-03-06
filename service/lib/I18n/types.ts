/**
 * I18n 서비스 타입 정의
 */

/**
 * 지원하는 언어 코드
 */
export type LanguageCode = 'ko' | 'en';

/**
 * 언어 변경 리스너 타입
 */
export type LanguageChangeListener = (language: LanguageCode) => void;

/**
 * 로드 상태 변경 리스너 타입
 */
export type LoadStateChangeListener = (isLoaded: boolean) => void;

/**
 * 에러 상태 변경 리스너 타입
 */
export type ErrorChangeListener = (error: string | null) => void;

/**
 * 번역 함수 타입
 */
export type TranslateFunction = (key: string, options?: Record<string, any>) => string;

/**
 * I18n 서비스 인터페이스
 */
export interface I18nServiceInterface {
  readonly currentLanguage: LanguageCode;
  readonly isLoaded: boolean;
  readonly error: string | null;

  initialize(): Promise<void>;
  loadLanguageResources(language: LanguageCode): Promise<void>;
  changeLanguage(language: LanguageCode): Promise<void>;

  addLanguageChangeListener(listener: LanguageChangeListener): () => void;
  addLoadStateChangeListener(listener: LoadStateChangeListener): () => void;
  addErrorChangeListener(listener: ErrorChangeListener): () => void;
}
