/**
 * 보상형 광고 훅
 */
import {useEffect, useState} from 'react';
import {RewardedAd, AdEventType, RewardedAdReward, RewardedAdEventType} from 'react-native-google-mobile-ads';
import {AdsService} from '@/service/lib/Ads/adapter';

/**
 * 보상형 광고 훅
 * 보상형 광고를 로드하고 표시하는 기능을 제공합니다.
 */
export const useRewardedAd = () => {
  const [rewardedAd, setRewardedAd] = useState<RewardedAd | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // 광고 서비스에서 보상형 광고 ID 가져오기
    const adsService = AdsService.getInstance();
    const adUnitIds = adsService.getAdUnitIds();
    const adUnitId = adUnitIds.rewarded;

    // 보상형 광고 인스턴스 생성
    const rewarded = RewardedAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
    });

    // 광고 이벤트 리스너 등록
    const unsubscribeLoaded = rewarded.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
      setError(null);
    });

    const unsubscribeClosed = rewarded.addAdEventListener(AdEventType.CLOSED, () => {
      // 광고가 닫히면 다시 로드
      setLoaded(false);
      rewarded.load();
    });

    const unsubscribeError = rewarded.addAdEventListener(AdEventType.ERROR, error => {
      setError(error);
      setLoaded(false);
    });

    // 광고 로드
    rewarded.load();
    setRewardedAd(rewarded);

    // 컴포넌트 언마운트 시 리스너 해제
    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeError();
    };
  }, []);

  /**
   * 보상형 광고 표시
   * @param onRewarded 보상 지급 시 호출될 콜백 함수
   * @returns 광고 표시 성공 여부
   */
  const showAd = async (onRewarded: (reward: RewardedAdReward) => void): Promise<boolean> => {
    if (loaded && rewardedAd) {
      // 보상 이벤트 리스너 등록
      const unsubscribeRewarded = rewardedAd.addAdEventListener(RewardedAdEventType.EARNED_REWARD, reward => {
        if (reward) {
          onRewarded(reward as RewardedAdReward);
        }
        unsubscribeRewarded();
      });

      await rewardedAd.show();
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

export default useRewardedAd;
