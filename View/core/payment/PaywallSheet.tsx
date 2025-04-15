import {useGlobalLoadingStore} from '@/service/lib/Loading/store';
import {PaymentService} from '@/service/lib/payment/adapter';
import {usePaymentStore} from '@/service/lib/payment/store';
import {Award, Ban, Calendar, X, Zap} from '@tamagui/lucide-icons';
import {LinearGradient} from 'expo-linear-gradient';
import {router} from 'expo-router';
import {t} from 'i18next';
import {useMemo, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {Button, Circle, Text, View, XStack, YStack} from 'tamagui';

type PaywallSheetProps = {
  onPurchaseSuccess?: () => void;
  onClose?: () => void;
  pt?: string;
};

export const PaywallSheet = ({onPurchaseSuccess, onClose, pt}: PaywallSheetProps) => {
  const {setIsLoading} = useGlobalLoadingStore();
  const {setHasUserActiveSubscription} = usePaymentStore();
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(0);
  const insets = useSafeAreaInsets();
  const subscriptionPackages = PaymentService.getSubscriptionPackages();

  const handleSubscribe = async (index: number) => {
    try {
      setIsLoading(true);
      const result = await PaymentService.purchasePackage(subscriptionPackages[index]);

      Toast.show({
        text1: '구독 완료',
        text2: '믿어주셔서 감사합니다! 더 나은 서비스로 보답하겠습니다.',
        type: 'success',
        visibilityTime: 3000,
      });
      console.log(result);

      setHasUserActiveSubscription(true);

      onPurchaseSuccess?.();
      onClose?.();
    } catch (error) {
      console.error(error);
      Toast.show({
        text1: '구독 실패',
        text2: '구독 실패했습니다. 다시 시도해주세요.',
        type: 'error',
        visibilityTime: 1000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestorePurchase = async () => {
    try {
      const result = await PaymentService.restorePurchases();
      Toast.show({
        text1: '구독 복구 완료',
        text2: '구독 복구가 완료되었습니다.',
        type: 'success',
        visibilityTime: 3000,
      });

      setHasUserActiveSubscription(true);
      onPurchaseSuccess?.();
      onClose?.();
    } catch (error) {
      console.error(error);
    }
  };

  const features = useMemo(
    () => [
      {
        icon: <Ban size={18} color="$accent1" />,
        title: '광고 완전 제거',
        description: '모든 광고를 제거할 수 있어요!',
      },
      {
        icon: <Zap size={18} color="$secondary1" />,
        title: '루틴, 스케쥴, 투두 무제한 생성',
        description: '하루에 생성 가능한 루틴, 스케쥴, 투두 개수가 무제한이에요!',
      },
      {
        icon: <Award size={18} color="$tertiary1" />,
        title: '무제한 테마 변경',
        description: '제공하는 모든 테마를 무제한으로 사용할 수 있어요!',
      },
      {
        icon: <Calendar size={18} color="$dataViz6" />,
        title: '캘린더 연동',
        description: 'PC, Tablet ,브라우저 등 외부 캘린더와 연동을 지원해요!',
      },
    ],
    [],
  );

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  return (
    <View flex={1} bg={'transparent'} position="relative" pt={pt ? pt : insets.top} pb={insets.bottom}>
      <LinearGradient colors={['#582858', '#002e58']} style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}} />
      <YStack flex={1} bg={'transparent'} p={'$8'}>
        <YStack gap="$4" pb="$3">
          <XStack ai="center" jc="space-between">
            <Text ff={'$heading'} fos={'$4'} color="#fff" fow={'800'} letterSpacing={'$5'}>
              Deskit PRO
            </Text>
            <Button onPress={handleClose} unstyled p={'$2'}>
              <X size={24} color="#fff" />
            </Button>
          </XStack>
        </YStack>

        {/* 주요 혜택 목록 */}
        <YStack gap="$3.5" bg="rgba(20, 20, 20, 0.7)" px={'$10'} py="$4" br="$7" borderWidth={1} borderColor="rgba(255, 255, 255, 0.1)" mt={'$8'}>
          {features.map((feature, index) => (
            <XStack key={index} gap="$8" ai="center" my="$1" py={'$4'} minHeight={80}>
              <Circle size={42} bg="rgba(0, 0, 0, 0.4)" p={'$4s'}>
                {feature.icon}
              </Circle>
              <YStack flex={1} gap={'$1'}>
                <Text ff={'$body'} fos={'$5'} color="#ffffff" fow={'800'}>
                  {feature.title}
                </Text>
                <Text ff={'$body'} fos={'$4'} color="#ffffff60" fow={'400'}>
                  {feature.description}
                </Text>
              </YStack>
            </XStack>
          ))}
        </YStack>

        {/* 구독 옵션 */}
        <YStack space="$3" mt="$8">
          <Text ff={'$body'} fos={'$7'} color="#fff" fow={'800'} px={'$4'}>
            구독 옵션
          </Text>

          {subscriptionPackages.length > 0 ? (
            <YStack space="$2">
              {subscriptionPackages.map((pkg, index) => (
                <Button
                  animation="medium"
                  unstyled
                  key={pkg.identifier}
                  bg={selectedPackageIndex === index ? 'rgba(52, 187, 139, 0.25)' : 'rgba(30, 30, 30, 0.8)'}
                  borderWidth={1}
                  borderColor={selectedPackageIndex === index ? '#34bb8b' : 'rgba(255, 255, 255, 0.1)'}
                  br="$sm"
                  px="$8"
                  py="$8"
                  mb="$1"
                  pressStyle={{scale: 0.98, opacity: 0.9}}
                  onPress={() => setSelectedPackageIndex(index)}>
                  <XStack jc="space-between" ai="center" width="100%">
                    <YStack flex={1} mr="$2" gap={'$2'}>
                      <Text color="#fff" fontWeight="700" fontSize={17} numberOfLines={1} ellipsizeMode="tail">
                        {pkg.product?.title || '구독'}
                      </Text>
                      <Text color="#fff" fontSize={13} lineHeight={16} numberOfLines={2} ellipsizeMode="tail">
                        {pkg.product.priceString} / {pkg.product.title}
                      </Text>
                    </YStack>
                    <Text color="#34bb8b" fontWeight="800" fontSize={16}>
                      {pkg.product?.pricePerMonth || '---'} {pkg.product?.currencyCode || '---'}
                    </Text>
                  </XStack>
                </Button>
              ))}
            </YStack>
          ) : (
            <YStack ai="center" jc="center" height={80}>
              <Text color="#fff">구독 옵션을 불러오는 중...</Text>
            </YStack>
          )}

          {/* 구독 버튼 */}
        </YStack>
        <YStack mt={'auto'} gap={'$3'}>
          <Button
            bg={'#34bb8b'}
            color="#000"
            fontWeight="700"
            fontSize={18}
            height={57}
            br="$6"
            pressStyle={{scale: 0.98, opacity: 0.9}}
            onPress={() => handleSubscribe(selectedPackageIndex)}
            animation="medium">
            {t('시작하기')}
          </Button>
          <Text color="#fff" fontSize={13} textAlign="center" onPress={() => handleRestorePurchase()}>
            restore purchase
          </Text>
        </YStack>
      </YStack>
    </View>
  );
};
