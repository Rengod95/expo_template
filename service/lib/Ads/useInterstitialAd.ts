import { useEffect, useMemo, useState } from "react";
import {
  AdEventType,
  type AdShowOptions,
} from "react-native-google-mobile-ads";

import { AdsService } from "@/service/lib/Ads/adapter";
import { usePaymentStore } from "@/service/lib/payment/store";
import { NativeModules } from "react-native";
const { TopViewControllerModule } = NativeModules;

export const dismissModalAndShowAd = async () => {
  try {
    const modalDismissed =
      await TopViewControllerModule.dismissModalAndShowAd();
  } catch (error) {
    console.error("Error dismissing modal:", error);
  }
};

export const useInterstitialAd = () => {
  const [isInterstitialInitialized, setIsInterstitialInitialized] =
    useState<boolean>(false);
  const interstitial = useMemo(
    () => AdsService.createInterstitialAdInstance(),
    []
  );
  const { hasUserActiveSubscription, isInitialized } = usePaymentStore();

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setIsInterstitialInitialized(true);
      }
    );

    interstitial.addAdEventListener(AdEventType.OPENED, (error) => {});

    interstitial.load();

    return unsubscribe;
  }, []);

  const showInterstitialAd = (options?: AdShowOptions) => {
    try {
      if (!isInitialized) {
        return;
      }

      if (hasUserActiveSubscription) {
        return;
      }

      if (isInterstitialInitialized && interstitial.loaded) {
        setTimeout(() => {
          interstitial.show().then(() => {
            interstitial.load();
          });
        }, 1000);
      } else {
        interstitial.load();
      }
    } catch (error) {
      console.error("Error showing interstitial ad:", error);
    }
  };

  return {
    interstitial,
    isInterstitialInitialized,
    showInterstitialAd,
  };
};
