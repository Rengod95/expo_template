/**
 * 루트 레이아웃
 */

import React, {useEffect, useState} from 'react';
import {Slot} from 'expo-router';
import {YStack, Spinner, TamaguiProvider} from 'tamagui';
import {AppProvider} from '@/View/store/app-provider';
import {useAuth} from '@/application/auth/useAuth';
import initializeServices from '@/service/initialize';
import tamaguiConfig from '@/tamagui.config';
import * as SplashScreen from 'expo-splash-screen';

// 스플래시 화면 표시
SplashScreen.preventAutoHideAsync();

/**
 * 루트 레이아웃 컴포넌트
 */
export default function RootLayout() {
  const [isInitialized, setIsInitialized] = useState(false);
  const {initializeAuthService} = useAuth();

  /**
   * 서비스 초기화
   */
  useEffect(() => {
    const initialize = async () => {
      try {
        // 서비스 초기화
        await initializeServices();

        // 인증 서비스 초기화
        await initializeAuthService();

        setIsInitialized(true);

        // 초기화 완료 후 스플래시 화면 숨기기
        await SplashScreen.hideAsync();
      } catch (error) {
        console.error('Failed to initialize app:', error);
      }
    };

    initialize();
  }, [initializeAuthService]);

  /**
   * 초기화 중 로딩 화면
   */
  if (!isInitialized) {
    return (
      <TamaguiProvider config={tamaguiConfig}>
        <YStack flex={1} justifyContent="center" alignItems="center">
          <Spinner size="large" color="$blue10" />
        </YStack>
      </TamaguiProvider>
    );
  }

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <AppProvider>
        <Slot />
      </AppProvider>
    </TamaguiProvider>
  );
}
