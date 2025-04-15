import { AdsService } from "@/service/lib/Ads/adapter";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { AdEventType } from "react-native-google-mobile-ads";
import { usePaymentStore } from "../payment/store";

export const useAppOpenAd = () => {
  const [isAppOpenAdLoaded, setIsAppOpenAdLoaded] = useState<boolean>(false);
  const { hasUserActiveSubscription, isInitialized } = usePaymentStore();

  const appOpenAdInstance = useMemo(() => {
    return AdsService.createAppOpenAdInstance();
  }, []);

  useLayoutEffect(() => {
    const unsubscribe = appOpenAdInstance.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setIsAppOpenAdLoaded(true);
      }
    );

    appOpenAdInstance.load();

    return unsubscribe;
  });

  const showAppOpenAd = () => {
    if (!appOpenAdInstance.loaded && !isAppOpenAdLoaded) return;

    return appOpenAdInstance.show();
  };

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    if (hasUserActiveSubscription) {
      return;
    }

    if (isAppOpenAdLoaded) {
      showAppOpenAd();
    }
  }, [isAppOpenAdLoaded, isInitialized, hasUserActiveSubscription]);

  return {
    appOpenAdInstance,
    showAppOpenAd,
  };
};
