/**
 * 인증 관련 페이지 레이아웃
 */

import React from 'react';
import { Stack } from 'expo-router';

/**
 * 인증 레이아웃 컴포넌트
 */
export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="login" />
    </Stack>
  );
}
