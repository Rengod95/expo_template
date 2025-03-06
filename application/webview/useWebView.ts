/**
 * WebView 페이지를 쉽게 사용할 수 있는 훅
 */
import {router} from 'expo-router';

/**
 * WebView 페이지 파라미터 타입
 */
export interface WebViewParams {
  url: string;
  title?: string;
}

/**
 * WebView 페이지를 쉽게 사용할 수 있는 훅
 */
export const useWebView = () => {
  /**
   * WebView 페이지로 이동
   * @param url 표시할 웹 페이지의 URL
   * @param title 웹 페이지의 제목 (선택)
   */
  const openWebView = (url: string, title?: string) => {
    // URL 인코딩
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = title ? encodeURIComponent(title) : undefined;

    // WebView 페이지로 이동
    router.push({
      pathname: '/webview',
      params: {
        url: encodedUrl,
        title: encodedTitle,
      },
    });
  };

  /**
   * WebView 페이지 닫기
   */
  const closeWebView = () => {
    router.back();
  };

  return {
    openWebView,
    closeWebView,
  };
};

export default useWebView;
