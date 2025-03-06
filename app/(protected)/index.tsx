/**
 * 보호된 홈 화면
 */

import React from 'react';
import {YStack, XStack, Button, Card, Text} from 'tamagui';
import {router} from 'expo-router';
import {useAuth} from '@application/auth/useAuth';
import {useWebView} from '@application/webview/useWebView';

/**
 * 보호된 홈 화면 컴포넌트
 */
export default function ProtectedHomeScreen() {
  const {user, logout} = useAuth();
  const {openWebView} = useWebView();

  /**
   * 로그아웃 처리
   */
  const handleLogout = async () => {
    await logout();
    router.replace('/auth/login');
  };

  return (
    <YStack flex={1} padding="$4" backgroundColor="$background">
      <YStack space="$4">
        <Text fontSize="$8" fontWeight="bold" textAlign="center">
          보호된 홈 화면
        </Text>

        <Card padding="$4" bordered>
          <YStack space="$4">
            <Text fontSize="$6" fontWeight="bold" textAlign="center">
              사용자 정보
            </Text>

            {user ? (
              <YStack space="$2">
                <Text fontSize="$4">이름: {user.name}</Text>
                <Text fontSize="$4">이메일: {user.email}</Text>
              </YStack>
            ) : (
              <Text fontSize="$4" textAlign="center">
                사용자 정보를 불러오는 중...
              </Text>
            )}

            <XStack space="$2" justifyContent="center">
              <Button onPress={() => router.push('/profile')} backgroundColor="$blue10">
                <Text color="white">프로필</Text>
              </Button>

              <Button onPress={() => router.push('/settings')} backgroundColor="$green10">
                <Text color="white">설정</Text>
              </Button>

              <Button onPress={handleLogout} backgroundColor="$red10">
                <Text color="white">로그아웃</Text>
              </Button>
            </XStack>
          </YStack>
        </Card>

        <Card padding="$4" bordered>
          <YStack space="$4">
            <Text fontSize="$6" fontWeight="bold" textAlign="center">
              WebView 테스트
            </Text>

            <XStack space="$2" justifyContent="center">
              <Button onPress={() => openWebView('https://www.google.com', '구글')} backgroundColor="$purple10">
                <Text color="white">구글 열기</Text>
              </Button>

              <Button onPress={() => openWebView('https://www.naver.com', '네이버')} backgroundColor="$green10">
                <Text color="white">네이버 열기</Text>
              </Button>
            </XStack>
          </YStack>
        </Card>
      </YStack>
    </YStack>
  );
}
