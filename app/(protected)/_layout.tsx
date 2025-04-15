/**
 * 보호된 라우트 레이아웃
 */

import React, { useEffect } from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@application/auth/useAuth";

/**
 * 보호된 라우트 레이아웃 컴포넌트
 */
export default function ProtectedLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
