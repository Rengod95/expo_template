# WebView 페이지 사용 가이드

이 문서는 WebView 페이지를 사용하는 방법에 대해 설명합니다.

## 개요

WebView 페이지는 앱 내에서 웹 콘텐츠를 표시하기 위한 페이지입니다. URL 파라미터를 통해 웹 페이지를 표시할 수 있으며, 모달 형태로 화면 위에 표시됩니다.

## 사용 방법

### 1. 기본 사용법

```typescript
import {router} from 'expo-router';

// WebView 페이지로 이동
router.push({
  pathname: '/webview',
  params: {
    url: encodeURIComponent('https://www.example.com'),
    title: encodeURIComponent('예제 페이지'),
  },
});
```

### 2. 파라미터 설명

- `url` (필수): 표시할 웹 페이지의 URL (URL 인코딩 필요)
- `title` (선택): 웹 페이지의 제목 (URL 인코딩 필요)

### 3. 헬퍼 함수 사용

```typescript
// 헬퍼 함수
const navigateToWebView = (url: string, title?: string) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = title ? encodeURIComponent(title) : undefined;

  router.push({
    pathname: '/webview',
    params: {url: encodedUrl, title: encodedTitle},
  });
};

// 사용 예시
navigateToWebView('https://www.example.com', '예제 페이지');
```

## 기능

- 웹 페이지 로딩 중 로딩 인디케이터 표시
- 웹 페이지 내에서 뒤로가기 지원
- 헤더에 제목 표시
- 닫기 버튼으로 WebView 페이지 종료

## 주의사항

- URL과 제목은 반드시 URL 인코딩을 해야 합니다.
- 유효하지 않은 URL을 제공하면 오류 메시지가 표시됩니다.
