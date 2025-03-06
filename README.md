# Expo 앱 템플릿

이 프로젝트는 Expo와 React Native를 사용한 모바일 앱 개발을 위한 템플릿입니다. 다양한 기능과 구조화된 아키텍처를 제공하여 빠르게 앱 개발을 시작할 수 있습니다.

## 주요 기능

- **계층형 아키텍처**: View, Application, Service 레이어로 구분된 명확한 아키텍처
- **광고 통합**: Google AdMob을 사용한 배너, 전면, 보상형 광고 지원
- **웹뷰 지원**: 앱 내에서 웹 콘텐츠를 표시하는 기능
- **인증 시스템**: 로그인, 회원가입 등 인증 관련 기능
- **UI 컴포넌트**: Tamagui를 사용한 모던한 UI 컴포넌트
- **라우팅**: Expo Router를 사용한 효율적인 화면 전환
- **다단계 페이지**: PagerView를 사용한 다단계 화면 구현

## 프로젝트 구조

```
- app/                  # 라우팅 폴더 (Expo Router)
  - root/               # 루트 라우팅
  - (protected)/        # 인증이 필요한 라우트
  - auth/               # 인증 관련 라우트
  - webview/            # 웹뷰 페이지
- application/          # 애플리케이션 레이어
  - auth/               # 인증 관련 로직
  - webview/            # 웹뷰 관련 로직
  - ads/                # 광고 관련 로직
- service/              # 서비스 레이어
  - inbound/            # 도메인 관련 서비스
  - lib/                # 범용 서비스
- View/                 # 뷰 레이어
  - core/               # 코어 컴포넌트
  - hooks/              # 뷰 관련 훅
  - store/              # 뷰 관련 스토어
  - icon/               # 아이콘 컴포넌트
```

## 시작하기

### 필수 조건

- Node.js (v14 이상)
- Yarn 또는 npm
- Expo CLI

### 설치

1. 이 템플릿을 사용하여 새 저장소 생성하기:

   - GitHub에서 "Use this template" 버튼 클릭
   - 또는 아래 명령어로 클론:

   ```bash
   git clone https://github.com/yourusername/expo-app-template.git your-project-name
   ```

2. 의존성 설치:

   ```bash
   cd your-project-name
   yarn install
   # 또는
   npm install
   ```

3. 개발 서버 실행:
   ```bash
   yarn start
   # 또는
   npm start
   ```

## 사용 가이드

### 광고 설정

`service/lib/Ads/adapter/index.ts` 파일에서 AdMob 광고 ID를 설정할 수 있습니다:

```typescript
export const PRODUCTION_AD_UNIT_IDS: AdUnitIds = {
  banner: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
  interstitial: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
  rewarded: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
  rewardedInterstitial: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
  appOpen: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
};
```

### 웹뷰 사용

웹뷰를 사용하려면 `useWebView` 훅을 사용하세요:

```typescript
import { useWebView } from '@application/webview/useWebView';

const MyComponent = () => {
  const { openWebView } = useWebView();

  return (
    <Button onPress={() => openWebView('https://example.com', '예제 페이지')}>
      웹페이지 열기
    </Button>
  );
};
```

### PagerView 사용

다단계 페이지를 구현하려면 `useNestedPagerView` 훅을 사용하세요:

```typescript
import { useNestedPagerView } from '@/View/hooks';

const PagerViewExample = () => {
  const { AnimatedPagerView, backToPrev, proceedToNext } = useNestedPagerView({
    pagesAmount: 3,
  });

  return (
    <View>
      <AnimatedPagerView>
        <Page1 key="1" />
        <Page2 key="2" />
        <Page3 key="3" />
      </AnimatedPagerView>
      <Button onPress={backToPrev}>이전</Button>
      <Button onPress={proceedToNext}>다음</Button>
    </View>
  );
};
```

## 라이선스

MIT
