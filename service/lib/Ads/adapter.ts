/**
 * Google Mobile Ads 서비스
 */

import {PRODUCTION_AD_UNIT_IDS, TEST_AD_UNIT_IDS} from '@/service/lib/Ads/consts';
import {InitializationSingleTon} from '@/service/lib/shared';
import serviceMediator from '@/service/lib/shared';
import {VariantService} from '@/service/lib/utils/Invariant/adapter';
import {requestTrackingPermissionsAsync} from 'expo-tracking-transparency';
import mobileAds, {AppOpenAd, InterstitialAd, MaxAdContentRating, type RequestOptions, RewardedAd} from 'react-native-google-mobile-ads';

/**
 * 광고 유닛 ID 타입
 */
export interface AdUnitIds {
  banner: string;
  interstitial: string;
  rewarded: string;
  appOpen: string;
}

/**
 * Google Mobile Ads 서비스 클래스
 */
export class AdsServiceAdapter extends InitializationSingleTon<AdsServiceAdapter> {
  private _isInitialized = false;
  private _interstitialAdUnitId: string | null = this.getAdUnitIds().interstitial;
  private _appOpenAdUnitId: string | null = this.getAdUnitIds().appOpen;
  private _bannerAdUnitId: string | null = this.getAdUnitIds().banner;
  private _rewardAdUnitId: string | null = this.getAdUnitIds().rewarded;

  constructor() {
    super();
    serviceMediator.registerServiceForInitialization(this);
  }

  getAdUnitIds(): AdUnitIds {
    return __DEV__ ? TEST_AD_UNIT_IDS : PRODUCTION_AD_UNIT_IDS;
  }

  /**
   * 광고 서비스 초기화
   */
  override async initialize(): Promise<void> {
    if (process.env.EXPO_PUBLIC_USE_ADS === 'false') {
      return;
    }

    try {
      await requestTrackingPermissionsAsync();
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

  public createInterstitialAdInstance(options?: RequestOptions) {
    VariantService.invariant(!!this._interstitialAdUnitId, {
      type: 'warning',
      message: 'interstitial ad id가 할당되지 않은 상태로 인스턴스 생성 시도',
    });
    return InterstitialAd.createForAdRequest(this._interstitialAdUnitId, options);
  }

  public createAppOpenAdInstance(options?: RequestOptions) {
    VariantService.invariant(!!this._appOpenAdUnitId, {
      type: 'warning',
      message: 'app open ad id가 할당되지 않은 상태로 인스턴스 생성 시도',
    });
    return AppOpenAd.createForAdRequest(this._appOpenAdUnitId, options);
  }

  public getBannerAdUnitId() {
    VariantService.invariant(!!this._bannerAdUnitId, {
      type: 'warning',
      message: 'banner ad id가 할당되지 않은 상태로 배너 생성 시도',
    });
    return this._bannerAdUnitId;
  }

  public createRewardAdInstance(options?: RequestOptions) {
    VariantService.invariant(!!this._rewardAdUnitId, {
      type: 'warning',
      message: 'reward ad id가 할당되지 않은 상태로 인스턴스 생성 시도',
    });
    return RewardedAd.createForAdRequest(this._rewardAdUnitId, options);
  }

  /**
   * 광고 서비스 초기화 여부
   */
  get isInitialized(): boolean {
    return this._isInitialized;
  }
}

export const AdsService = AdsServiceAdapter.getInstance();
