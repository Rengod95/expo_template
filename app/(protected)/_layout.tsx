/**
 * 보호된 라우트 레이아웃
 */

import React, {useEffect} from 'react';
import {Redirect, Stack} from 'expo-router';
import {useAuth} from '@application/auth/useAuth';

/**
 * 보호된 라우트 레이아웃 컴포넌트
 */
export default function ProtectedLayout() {
  const {isAuthenticated, isLoading} = useAuth();

  // 로딩 중이 아니고 인증되지 않은 경우 로그인 페이지로 리다이렉트
  if (!isLoading && !isAuthenticated) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
