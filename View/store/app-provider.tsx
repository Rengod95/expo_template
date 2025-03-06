/**
 * 앱의 메인 Provider 컴포넌트
 */

import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

/**
 * AppProvider Props 타입
 */
type AppProviderProps = {
  children: React.ReactNode;
};

/**
 * AppProvider 컴포넌트
 *
 * 앱에서 사용되는 모든 Provider를 포함합니다.
 */
export const AppProvider = ({ children }: AppProviderProps) => {
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
};
