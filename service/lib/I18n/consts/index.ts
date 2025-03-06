/**
 * i18n 서비스 관련 상수
 */

import { LanguageCode } from '../types';

/**
 * 지원하는 언어 목록
 */
export const SUPPORTED_LANGUAGES: LanguageCode[] = ['ko', 'en'];

/**
 * 기본 언어
 */
export const DEFAULT_LANGUAGE: LanguageCode = 'en';

/**
 * 언어 파일 경로
 */
export const LANGUAGE_FILE_PATH = '/assets/languages/';

/**
 * 언어 파일 확장자
 */
export const LANGUAGE_FILE_EXTENSION = '.json';

/**
 * 언어 저장소 키
 */
export const I18N_STORAGE_KEY = 'language';

/**
 * i18n 초기화 옵션
 */
export const I18N_INIT_OPTIONS = {
  fallbackLng: DEFAULT_LANGUAGE,
  debug: __DEV__,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
};
