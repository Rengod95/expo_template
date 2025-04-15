/**
 * 루트 레이아웃
 */

import React, {useCallback, useEffect, useState} from 'react';
import {Slot} from 'expo-router';
import {YStack, Spinner, TamaguiProvider, View} from 'tamagui';
import initializeServices from '@/service/initialize';

import * as SplashScreen from 'expo-splash-screen';
import {useAppFonts} from '@/View/bootstrap/useFonts';
import {AppProvider} from '@/View/store/AppProvider';
import {GlobalLoadingSpinner} from '@/View/core/GlobalLoadingSpinner';
import SpInAppUpdates, { IosStartUpdateOptions } from 'sp-react-native-in-app-updates';
import {configureReanimatedLogger, ReanimatedLogLevel} from 'react-native-reanimated';
import { GlobalPaywallSheet } from '@/View/core/payment/GlobalPaywallSheet';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@/View/core/Toast/config';
import Constants from 'expo-constants';
import { useGlobalPaywallStore } from '@/View/store/GlobalPaywallStore';
import { useHydrationStatus } from '@/View/bootstrap/useHydrationStatus';

const inAppUpdates = new SpInAppUpdates(
  true, // isDebug
);

inAppUpdates.checkNeedsUpdate().then(result => {
  const isDifferentMinorVersion = result.storeVersion.split('.')[1] !== Constants.expoConfig?.version?.split('.')[1];

  const isDifferentMajorVersion = result.storeVersion.split('.')[0] !== Constants.expoConfig?.version?.split('.')[0];

  if (result.shouldUpdate) {
    const updateOptions: IosStartUpdateOptions = {
      forceUpgrade: isDifferentMajorVersion || isDifferentMinorVersion,
      title: 'New Version Available',
      message: 'Please update to the latest version',
      buttonUpgradeText: 'Update',
      buttonCancelText: 'Later',
    };

    inAppUpdates.startUpdate(updateOptions); // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
  }
});

SplashScreen.preventAutoHideAsync();

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

/**
 * 루트 레이아웃 컴포넌트
 */
export default function RootLayout() {
  const [isServiceInitialized, setIsServiceInitialized] = useState(false);

  // 폰트 로드 상태
  const {isGlobalFontLoaded, hasGlobalFontLoadingError} = useAppFonts();
  // 스토어 하이드레이션 상태
  const isHydrated = useHydrationStatus();


  // Paywall 팝업 오픈 상태
  const {isPaywallOpen, setIsPaywallOpen} = useGlobalPaywallStore();

  /**
   * 서비스 초기화
   */
  useEffect(() => {
    const initialize = async () => {
      try {
        // 서비스 초기화
        await initializeServices();

        setIsServiceInitialized(true);

        // 초기화 완료 후 스플래시 화면 숨기기
        await SplashScreen.hideAsync();
      } catch (error) {
        console.error('Failed to initialize app:', error);
      }
    };

    initialize();
  }, []);

  const Render = useCallback(() => {
    if (!isServiceInitialized && !isGlobalFontLoaded && !isHydrated) {
      return (
        <YStack flex={1} justifyContent="center" alignItems="center">
          <Spinner size="large" color="$blue10" />
        </YStack>
      );
    }

    return <Slot />;
  }, [isServiceInitialized, isGlobalFontLoaded, isHydrated]);

  return (
    <AppProvider>
      <Render />
      <View>
        <Toast config={toastConfig} />
      </View>
      <GlobalPaywallSheet isOpen={isPaywallOpen} onClose={() => setIsPaywallOpen(false)} />
      <GlobalLoadingSpinner />
    </AppProvider>
  );
}

