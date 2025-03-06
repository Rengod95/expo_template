/**
 * 배너 광고 컴포넌트
 */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {BannerAd as RNBannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import {AdsService} from '@/service/lib/Ads/adapter';

interface BannerAdProps {
  size?: BannerAdSize;
  onAdLoaded?: () => void;
  onAdFailedToLoad?: (error: Error) => void;
}

/**
 * 배너 광고 컴포넌트
 */
export const BannerAd: React.FC<BannerAdProps> = ({size = BannerAdSize.BANNER, onAdLoaded, onAdFailedToLoad}) => {
  const [adUnitId, setAdUnitId] = useState<string | null>(null);

  useEffect(() => {
    // 광고 서비스에서 배너 광고 ID 가져오기
    const adsService = AdsService.getInstance();
    const adUnitIds = adsService.getAdUnitIds();
    setAdUnitId(adUnitIds.banner);
  }, []);

  if (!adUnitId) {
    return null;
  }

  return (
    <View style={styles.container}>
      <RNBannerAd
        unitId={adUnitId}
        size={size}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={onAdLoaded}
        onAdFailedToLoad={error => {
          console.error('Banner ad failed to load:', error);
          onAdFailedToLoad?.(error);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default BannerAd;
