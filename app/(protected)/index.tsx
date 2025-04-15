/**
 * 보호된 홈 화면
 */

import React from "react";
import { YStack, XStack, Button, Card, Text } from "tamagui";
import { router } from "expo-router";
import { useAuth } from "@application/auth/useAuth";
import { useWebView } from "@application/webview/useWebView";

/**
 * 보호된 홈 화면 컴포넌트
 */
export default function ProtectedHomeScreen() {
  return (
    <YStack flex={1} padding="$4" backgroundColor="$background">
      <Text ff={"$body"} fos={"$5"}>
        Protected Home
      </Text>
    </YStack>
  );
}
