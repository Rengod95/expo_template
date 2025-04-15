import {AdUnitIds} from '@/service/lib/Ads/adapter';
import {Platform} from 'react-native';
import {TestIds} from 'react-native-google-mobile-ads';

/**
 * 개발 환경용 테스트 광고 유닛 ID
 */
export const TEST_AD_UNIT_IDS: AdUnitIds = {
  banner: TestIds.BANNER,
  interstitial: TestIds.INTERSTITIAL,
  rewarded: TestIds.REWARDED,
  appOpen: TestIds.APP_OPEN,
};

export const PRODUCTION_AD_UNIT_IDS: AdUnitIds = {
  banner: Platform.select({
    ios: process.env.EXPO_PUBLIC_ADS_UNIT_ID_BANNER_IOS,
    android: process.env.EXPO_PUBLIC_ADS_UNIT_ID_BANNER_ANDROID,
  }),
  interstitial: Platform.select({
    ios: process.env.EXPO_PUBLIC_ADS_UNIT_ID_INTERSTITIAL_IOS,
    android: process.env.EXPO_PUBLIC_ADS_UNIT_ID_INTERSTITIAL_ANDROID,
  }),
  rewarded: Platform.select({
    ios: process.env.EXPO_PUBLIC_ADS_UNIT_ID_REWARDED_IOS,
    android: process.env.EXPO_PUBLIC_ADS_UNIT_ID_REWARDED_ANDROID,
  }),
  appOpen: Platform.select({
    ios: process.env.EXPO_PUBLIC_ADS_UNIT_ID_APP_OPEN_IOS,
    android: process.env.EXPO_PUBLIC_ADS_UNIT_ID_APP_OPEN_ANDROID,
  }),
};
