import {Slot, Stack} from 'expo-router';

export default function PaywallLayout() {
  return (
    <Stack screenOptions={{headerShown: false, presentation: 'modal'}}>
      <Stack.Screen name="index" options={{headerShown: false, presentation: 'transparentModal'}} />
    </Stack>
  );
}
