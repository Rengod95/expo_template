/**
 * WebView 레이아웃
 */
import React from 'react';
import {Stack} from 'expo-router';

/**
 * WebView 레이아웃 컴포넌트
 */
export default function WebViewLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        presentation: 'modal',
      }}
    />
  );
}
