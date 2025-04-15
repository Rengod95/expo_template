import {useGlobalLoadingStore} from '@/service/lib/Loading/store';
import {Spinner, Text, View} from 'tamagui';
import {useColorScheme} from 'react-native';

export const GlobalLoadingSpinner = () => {
  const loadingStore = useGlobalLoadingStore();
  const colorScheme = useColorScheme();

  if (!loadingStore.isLoading) return null;

  return (
    <View
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="rgba(0,0,0,0.5)"
      zIndex={100_000_000}
      ai="center"
      jc="center"
      gap={'$space.2'}>
      <Spinner color={'#fff'} size="large" />
      <Text ff={'$body'} fos={'$5'} color={'#fff'} opacity={0.8}>
        Loading...
      </Text>
    </View>
  );
};
