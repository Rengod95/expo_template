/**
 * 언어 관리 훅
 *
 * 이 훅은 애플리케이션의 언어 설정을 관리하는 기능을 제공합니다.
 * 사용자가 언어를 변경하거나 현재 언어 상태를 확인할 수 있습니다.
 *
 * 의존성:
 * - I18nService: 언어 리소스 로드 및 변경 기능 제공
 * - useI18nStore: 언어 상태 관리
 */

import {useCallback, useEffect} from 'react';

import {useI18n, i18nService} from '@service/lib/I18n/adapter';
import {useI18nStore} from '@service/lib/I18n/store';
import {LanguageCode} from '@service/lib/I18n/types';
import {SUPPORTED_LANGUAGES} from '@service/lib/I18n/consts';

/**
 * 언어 관리 훅
 */
export const useLanguage = () => {
  const {t} = useI18n();
  const {currentLanguage, isLoaded, error, setCurrentLanguage, setIsLoaded, setError} = useI18nStore();

  /**
   * 서비스 초기화 및 전역 스토어 연결
   * 서비스 어댑터와 전역 스토어를 연결하는 초기화 로직
   */
  const initializeLanguageService = useCallback(async () => {
    try {
      // 서비스 초기화 전에 스토어 상태 업데이트
      setIsLoaded(false);
      setError(null);

      // 서비스 초기화
      await i18nService.initialize();

      // 초기 상태 동기화
      setCurrentLanguage(i18nService.currentLanguage);
      setIsLoaded(i18nService.isLoaded);
      setError(i18nService.error);
    } catch (error) {
      setError(error instanceof Error ? error.message : '언어 서비스 초기화 중 오류 발생');
      console.error('Language service initialization error:', error);
    }
  }, [setCurrentLanguage, setIsLoaded, setError]);

  // 컴포넌트 마운트 시 서비스 초기화 및 이벤트 리스너 등록
  useEffect(() => {
    // 서비스 초기화
    initializeLanguageService();

    // 이벤트 리스너 등록
    const unsubscribeLanguage = i18nService.addLanguageChangeListener(language => {
      setCurrentLanguage(language);
    });

    const unsubscribeLoaded = i18nService.addLoadStateChangeListener(isLoaded => {
      setIsLoaded(isLoaded);
    });

    const unsubscribeError = i18nService.addErrorChangeListener(error => {
      setError(error);
    });

    // 컴포넌트 언마운트 시 이벤트 리스너 해제
    return () => {
      unsubscribeLanguage();
      unsubscribeLoaded();
      unsubscribeError();
    };
  }, [setCurrentLanguage, setIsLoaded, setError, initializeLanguageService]);

  /**
   * 지원되는 언어 목록 반환
   */
  const getSupportedLanguages = useCallback(() => {
    return SUPPORTED_LANGUAGES;
  }, []);

  /**
   * 특정 언어가 지원되는지 확인
   */
  const isLanguageSupported = useCallback((language: string): boolean => {
    return SUPPORTED_LANGUAGES.includes(language as LanguageCode);
  }, []);

  /**
   * 언어 변경 처리
   */
  const handleLanguageChange = useCallback(async (language: LanguageCode) => {
    try {
      await i18nService.changeLanguage(language);
    } catch (error) {
      console.error('Language change error:', error);
    }
  }, []);

  /**
   * 한국어와 영어 간 토글
   */
  const toggleLanguage = useCallback(() => {
    const newLanguage = currentLanguage === 'ko' ? 'en' : 'ko';
    handleLanguageChange(newLanguage);
  }, [currentLanguage, handleLanguageChange]);

  return {
    t,
    currentLanguage,
    isLoaded,
    error,
    getSupportedLanguages,
    isLanguageSupported,
    handleLanguageChange,
    toggleLanguage,
    initializeLanguageService,
  };
};
