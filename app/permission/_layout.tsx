import {Slot, Stack} from 'expo-router';

export default function PermissionLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" options={{headerShown: false}} />
    </Stack>
  );
}
