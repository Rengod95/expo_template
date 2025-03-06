/**
 * 로그인 페이지
 */

import React, {useState} from 'react';
import {YStack, XStack, Input, Button, Text, Spinner} from 'tamagui';
import {router} from 'expo-router';
import {useAuth} from '@application/auth/useAuth';

/**
 * 로그인 화면 컴포넌트
 */
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, isLoading, error} = useAuth();

  /**
   * 로그인 처리
   */
  const handleLogin = async () => {
    if (!email || !password) {
      return;
    }

    const success = await login(email, password);
    if (success) {
      router.replace('/');
    }
  };

  return (
    <YStack flex={1} padding="$4" justifyContent="center" backgroundColor="$background">
      <YStack space="$4" maxWidth={400} width="100%" alignSelf="center">
        <Text fontSize="$8" fontWeight="bold" textAlign="center">
          로그인
        </Text>

        <YStack space="$4">
          <Input placeholder="이메일" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />

          <Input placeholder="비밀번호" value={password} onChangeText={setPassword} secureTextEntry />

          {error && (
            <Text color="$red10" fontSize="$3">
              {error}
            </Text>
          )}

          <Button onPress={handleLogin} disabled={isLoading || !email || !password} backgroundColor={isLoading ? '$gray8' : '$blue10'}>
            {isLoading ? (
              <XStack space="$2" alignItems="center">
                <Spinner size="small" color="white" />
                <Text color="white">로그인 중...</Text>
              </XStack>
            ) : (
              <Text color="white">로그인</Text>
            )}
          </Button>

          <Text fontSize="$3" textAlign="center" marginTop="$4">
            테스트 계정: test@example.com / password
          </Text>
        </YStack>
      </YStack>
    </YStack>
  );
}
