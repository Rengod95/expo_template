/**
 * 전면 광고 훅
 */
import {useEffect, useState} from 'react';
import {InterstitialAd, AdEventType} from 'react-native-google-mobile-ads';
import {AdsService} from '@/service/lib/Ads/adapter';

/**
 * 전면 광고 훅
 * 전면 광고를 로드하고 표시하는 기능을 제공합니다.
 */
export const useInterstitialAd = () => {
  const [interstitialAd, setInterstitialAd] = useState<InterstitialAd | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // 광고 서비스에서 전면 광고 ID 가져오기
    const adsService = AdsService.getInstance();
    const adUnitIds = adsService.getAdUnitIds();
    const adUnitId = adUnitIds.interstitial;

    // 전면 광고 인스턴스 생성
    const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
    });

    // 광고 이벤트 리스너 등록
    const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
      setError(null);
    });

    const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      // 광고가 닫히면 다시 로드
      setLoaded(false);
      interstitial.load();
    });

    const unsubscribeError = interstitial.addAdEventListener(AdEventType.ERROR, error => {
      setError(error);
      setLoaded(false);
    });

    // 광고 로드
    interstitial.load();
    setInterstitialAd(interstitial);

    // 컴포넌트 언마운트 시 리스너 해제
    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeError();
    };
  }, []);

  /**
   * 전면 광고 표시
   * @returns 광고 표시 성공 여부
   */
  const showAd = async (): Promise<boolean> => {
    if (loaded && interstitialAd) {
      await interstitialAd.show();
      return true;
    }
    return false;
  };

  return {
    loaded,
    error,
    showAd,
  };
};

export default useInterstitialAd;
