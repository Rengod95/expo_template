import {useInterstitialAd} from '@/service/lib/Ads/useInterstitialAd';

export const useShowInterstitialAdApplication = () => {
  const {interstitial} = useInterstitialAd();

  useEffect(() => {
    interstitial.show();
  }, [interstitial]);
};
