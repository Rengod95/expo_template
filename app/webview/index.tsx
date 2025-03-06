/**
 * WebView 페이지
 * URL 파라미터를 통해 웹뷰를 표시합니다.
 */
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, BackHandler, StyleSheet} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {WebView} from 'react-native-webview';
import {YStack, XStack, Button, Text} from 'tamagui';
import {Ionicons} from '@expo/vector-icons';

/**
 * WebView 페이지 컴포넌트
 */
export default function WebViewScreen() {
  const {url, title} = useLocalSearchParams<{url: string; title?: string}>();
  const [isLoading, setIsLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const webViewRef = useRef<WebView>(null);
  const router = useRouter();

  // URL 디코딩
  const decodedUrl = decodeURIComponent(url || '');
  const pageTitle = title ? decodeURIComponent(title) : '웹 페이지';

  // 뒤로가기 버튼 처리
  useEffect(() => {
    const backAction = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [canGoBack]);

  // URL이 없는 경우 처리
  if (!decodedUrl) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" padding="$4">
        <Text fontSize="$6" fontWeight="bold" color="$red10">
          URL이 제공되지 않았습니다.
        </Text>
        <Button marginTop="$4" onPress={() => router.back()} backgroundColor="$blue10" color="white">
          뒤로 가기
        </Button>
      </YStack>
    );
  }

  return (
    <YStack flex={1}>
      {/* 헤더 */}
      <XStack
        height={60}
        backgroundColor="$background"
        alignItems="center"
        paddingHorizontal="$4"
        justifyContent="space-between"
        borderBottomWidth={1}
        borderBottomColor="$borderColor">
        <Button
          size="$3"
          circular
          icon={<Ionicons name="arrow-back" size={24} color="#000" />}
          onPress={() => {
            if (canGoBack && webViewRef.current) {
              webViewRef.current.goBack();
            } else {
              router.back();
            }
          }}
        />
        <Text fontSize="$5" fontWeight="bold" flex={1} textAlign="center">
          {pageTitle}
        </Text>
        <Button size="$3" circular icon={<Ionicons name="close" size={24} color="#000" />} onPress={() => router.back()} />
      </XStack>

      {/* 웹뷰 */}
      <WebView
        ref={webViewRef}
        source={{uri: decodedUrl}}
        style={styles.webview}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onNavigationStateChange={navState => {
          setCanGoBack(navState.canGoBack);
        }}
      />

      {/* 로딩 인디케이터 */}
      {isLoading && (
        <YStack
          position="absolute"
          top={60}
          left={0}
          right={0}
          bottom={0}
          justifyContent="center"
          alignItems="center"
          backgroundColor="rgba(255, 255, 255, 0.8)">
          <ActivityIndicator size="large" color="#0000ff" />
        </YStack>
      )}
    </YStack>
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});
