import {AdsService} from '@/service/lib/Ads/adapter';
import {useBannerAd} from '@/service/lib/Ads/useBannerAd';
import {usePaymentStore} from '@/service/lib/payment/store';
/**
 * 배너 광고 컴포넌트
 */
import type React from 'react';
import {BannerAdSize, BannerAd as RNBannerAd} from 'react-native-google-mobile-ads';
import {XStack} from 'tamagui';

interface BannerAdProps {
  size?: BannerAdSize;
  onAdLoaded?: () => void;
  onAdFailedToLoad?: (error: Error) => void;
}

/**
 * 배너 광고 컴포넌트
 */
export const BannerAd: React.FC<BannerAdProps> = ({size = BannerAdSize.ANCHORED_ADAPTIVE_BANNER, onAdLoaded, onAdFailedToLoad}) => {
  const {hasUserActiveSubscription} = usePaymentStore();

  const bannerRef = useBannerAd();

  if (hasUserActiveSubscription) {
    return null;
  }

  return (
    <XStack w={'100%'} justifyContent="center" my={'$8'}>
      <RNBannerAd
        ref={bannerRef}
        unitId={AdsService.getBannerAdUnitId()}
        size={size}
        requestOptions={{
          requestNonPersonalizedAdsOnly: false,
        }}
        onAdLoaded={onAdLoaded}
        onAdFailedToLoad={error => {
          console.error('Banner ad failed to load:', error);
          onAdFailedToLoad?.(error);
        }}
      />
    </XStack>
  );
};

export default BannerAd;
