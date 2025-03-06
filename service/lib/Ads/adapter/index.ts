/**
 * Google Mobile Ads 서비스
 */

import {InitializationSingleTon} from '@/service/lib/shared';
import serviceMediator from '@/service/lib/shared';
import mobileAds, {MaxAdContentRating, TestIds} from 'react-native-google-mobile-ads';

/**
 * 광고 유닛 ID 타입
 */
export interface AdUnitIds {
  banner: string;
  interstitial: string;
  rewarded: string;
  rewardedInterstitial: string;
  appOpen: string;
}

/**
 * 개발 환경용 테스트 광고 유닛 ID
 */
export const TEST_AD_UNIT_IDS: AdUnitIds = {
  banner: TestIds.BANNER,
  interstitial: TestIds.INTERSTITIAL,
  rewarded: TestIds.REWARDED,
  rewardedInterstitial: TestIds.REWARDED_INTERSTITIAL,
  appOpen: TestIds.APP_OPEN,
};

/**
 * 프로덕션 환경용 광고 유닛 ID
 * 실제 AdMob에서 발급받은 ID로 교체해야 합니다.
 */
export const PRODUCTION_AD_UNIT_IDS: AdUnitIds = {
  banner: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy',
  interstitial: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy',
  rewarded: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy',
  rewardedInterstitial: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy',
  appOpen: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy',
};

/**
 * 현재 환경에 맞는 광고 유닛 ID 반환
 */
export const getAdUnitIds = (): AdUnitIds => {
  return __DEV__ ? TEST_AD_UNIT_IDS : PRODUCTION_AD_UNIT_IDS;
};

/**
 * Google Mobile Ads 서비스 클래스
 */
export class AdsService extends InitializationSingleTon<AdsService> {
  private _isInitialized: boolean = false;

  constructor() {
    super();
    serviceMediator.registerServiceForInitialization(this);
  }

  /**
   * 광고 서비스 초기화
   */
  override async initialize(): Promise<void> {
    try {
      // Google Mobile Ads SDK 초기화
      const adapterStatuses = await mobileAds().initialize();

      // 광고 콘텐츠 등급 설정
      await mobileAds().setRequestConfiguration({
        // 최대 광고 콘텐츠 등급 설정
        maxAdContentRating: MaxAdContentRating.PG,
        // 태그된 어린이용 앱 여부
        tagForChildDirectedTreatment: false,
        // 태그된 미성년자용 앱 여부
        tagForUnderAgeOfConsent: false,
        // 테스트 기기 ID 목록
        testDeviceIdentifiers: ['EMULATOR'],
      });

      this._isInitialized = true;

      console.log('Google Mobile Ads initialized:', adapterStatuses);
    } catch (error) {
      console.error('Failed to initialize Google Mobile Ads:', error);
      throw error;
    }
  }

  /**
   * 광고 서비스 초기화 여부
   */
  get isInitialized(): boolean {
    return this._isInitialized;
  }

  /**
   * 광고 유닛 ID 가져오기
   */
  getAdUnitIds(): AdUnitIds {
    return getAdUnitIds();
  }
}

export default AdsService;
