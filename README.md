# Expo 앱 템플릿

이 프로젝트는 Expo와 React Native를 사용한 모바일 앱 개발을 위한 템플릿입니다. 다양한 기능과 구조화된 아키텍처를 제공하여 빠르게 앱 개발을 시작할 수 있습니다.

## 주요 기능

- **계층형 아키텍처**: View, Application, Service 레이어로 구분된 명확한 아키텍처 (@rebe-rule.mdc 참조)
- **상태 관리**: Zustand를 사용한 효율적인 상태 관리 (@zustand-store-rule.mdc 참조)
- **광고 통합**: Google AdMob을 사용한 배너, 전면, 보상형 광고 지원
- **웹뷰 지원**: 앱 내에서 웹 콘텐츠를 표시하는 기능
- **인증 시스템**: Firebase 기반 익명 로그인 등 인증 관련 기능
- **UI 컴포넌트**: Tamagui를 사용한 모던한 UI 컴포넌트 (잠재적)
- **라우팅**: Expo Router를 사용한 효율적인 화면 전환
- **다단계 페이지**: PagerView를 사용한 다단계 화면 구현

## 프로젝트 구조

```
- app/                  # 라우팅 폴더 (Expo Router)
  - (protected)/        # 인증이 필요한 라우트
  - Paywall/            # 결제 유도 페이지
  - Permission/         # 필수 퍼미션 요청 페이지
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

### 파이어베이스 설정 - REQUIRED

1. 프로젝트 설정 파일 다운로드 및 프로젝트 루트 디렉터리 적용 필요

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

### 2 레이어 상세 설명

*   **`app`**:
    *   Expo Router의 파일 시스템 기반 라우팅 규칙을 따릅니다.
    *   `_layout.tsx`: 전역 레이아웃, 공통 Provider (예: ThemeProvider, QueryClientProvider) 설정.
    *   `index.tsx`: 앱의 기본 진입 페이지.
    *   `(group)` 폴더: 특정 라우트 그룹 관리 (예: `(protected)`, `auth`).
    *   페이지 컴포넌트 자체는 단순하게 유지하고, 복잡한 로직은 `application` 훅을 사용합니다.
*   **`View`**:
    *   UI 렌더링과 직접적인 사용자 상호작용 처리에 집중합니다.
    *   `core`: 재사용 가능한 기본 UI 컴포넌트 (Button, Input 등). 특정 페이지 전용 컴포넌트는 `app/[page]/components`에 위치.
    *   `hooks`: UI 동작, 애니메이션, `View/store` 사용 등 UI 관련 커스텀 훅.
    *   `store`: 순수 UI 상태 관리 (예: 테마, 알림 모달 상태). 전역 비즈니스 상태는 `service`의 스토어 사용.
    *   `bootstrap`: 앱 시작 시 필요한 초기화 로직 관련 훅 (예: `useFonts`, `useHydrationStatus`).
*   **`application`**:
    *   특정 사용자 액션(로그인, 데이터 요청 등)이나 유스케이스를 처리하는 **훅** 형태로 제공됩니다.
    *   View 레이어와 Service 레이어 간의 **브릿지 역할**을 수행합니다.
    *   여러 `service`의 함수나 `store` 상태를 조합하여 복잡한 흐름을 관리합니다.
    *   View 컴포넌트는 이 훅을 호출하여 비즈니스 로직을 실행합니다.
*   **`service`**:
    *   앱의 핵심 비즈니스 로직, 데이터 처리, 외부 API 연동, 전역 상태 정의 등을 담당합니다.
    *   **View 레이어에 대한 의존성이 없어야 합니다.**
    *   `lib`: 도메인과 무관한 범용 서비스 또는 특정 도메인 서비스 모듈화.
        *   `[Domain]/adapter.ts`: 서비스의 핵심 기능 구현 (주로 싱글톤 클래스).
        *   `[Domain]/store.ts`: 해당 도메인의 전역 상태 (Zustand).
        *   `[Domain]/consts.ts`, `[Domain]/types.d.ts`: 상수 및 타입 정의.
    *   `Store`: Zustand 스토어 생성 및 하이드레이션 관리 중앙 처리 (`adapter.ts`, `HydrationManager.ts`).
    *   `shared.ts`: 여러 서비스에서 공통으로 사용하는 유틸리티 (`InitializationSingleTon` 등).
    *   `initialize.ts`: (선택 사항) 앱 시작 시 특정 서비스 초기화 로직.

### 2.3. 데이터 흐름 및 의존성 규칙

*   **단방향 의존성**: `View` -> `application` -> `service`
*   `View`는 `application` 훅을 호출하거나 `service`의 `store`를 직접 구독할 수 있습니다. (복잡한 로직은 `application` 권장)
*   `application`은 `service`의 `adapter` 함수를 호출하거나 `store` 상태를 읽고 쓸 수 있습니다.
*   `service`는 다른 `service`에 의존할 수 있지만, `application`이나 `View`에 의존해서는 안 됩니다.
*   `store` 상태는 `service` 또는 `application`에서 주로 업데이트하며, `View`에서는 주로 읽기용으로 사용합니다.

## 3. 프로젝트 초기화 과정

앱이 시작될 때 다음과 같은 과정을 거쳐 초기화됩니다.

1.  **Expo 앱 진입**: `app/_layout.tsx` 또는 `app/index.tsx` 실행.
2.  **전역 레이아웃/Provider**: `app/_layout.tsx`에서 필요한 전역 Provider (테마, 네비게이션 등) 렌더링.
3.  **Bootstrap 훅 실행**: `View/bootstrap` 내의 훅들이 실행됩니다.
    *   `useFonts`: 앱에서 사용할 폰트 로딩.
    *   `useHydrationStatus`: `service/lib/Store/HydrationManager`를 구독하여 AsyncStorage로부터 모든 Zustand 스토어의 상태 복원(Hydration) 완료 여부 추적.
4.  **서비스 초기화**: (필요시) `service/initialize.ts`에 정의된 초기화 로직 실행.
5.  **스토어 하이드레이션**: 각 영속성 스토어(`createPersistentStore`로 생성된)가 비동기적으로 AsyncStorage에서 상태를 로드합니다. `HydrationManager`가 모든 스토어의 완료 상태를 관리합니다.
6.  **초기 화면 렌더링**: 하이드레이션 상태 및 로딩된 폰트를 기반으로 앱의 초기 화면(`app/index.tsx` 또는 라우팅된 페이지)이 렌더링됩니다. `useHydrationStatus` 훅을 사용하여 하이드레이션 완료 전까지 스플래시 화면 등을 표시할 수 있습니다.

## 4. 개발 가이드

### 4.1. Zustand 스토어 작성 (`service/lib/[Domain]/store.ts`)

상태 관리는 Zustand를 사용합니다. 상세 규칙은 `.cursor/rules/zustand-store-rule.mdc`를 참조하세요.

*   **목적**: 전역적으로 공유되어야 하는 비즈니스 상태 관리.
*   **영속성 여부 결정**:
    *   **필요**: 앱 재시작 후에도 유지되어야 하는 데이터 (사용자 설정, 인증 상태 등) -> `StoreService.createPersistentStore` 사용 (AsyncStorage 자동 저장/복원).
    *   **불필요**: 앱 실행 중에만 필요한 임시 데이터 (로딩 상태, 특정 UI 상태 등) -> `createStore` 직접 사용.
*   **구조**:
    *   `State` 및 `Actions` 타입 분리 정의.
    *   `initialState` 객체 정의.
    *   스토어 생성 함수(`createPersistentStore` 또는 `createStore`) 내에서 `initialState`와 액션 구현.
    *   생성된 스토어 인스턴스와 `useStore(MyStore)`를 사용하는 커스텀 훅(`useMyStore`) 함께 export.
*   **사용**:
    *   `application` 훅에서 주로 상태 변경 및 읽기 수행.
    *   `View` 컴포넌트/훅에서 상태 구독 및 읽기 (복잡한 업데이트 로직은 `application` 훅 경유).

### 4.2. Service 작성 (`service/lib/[Domain]`)

핵심 비즈니스 로직, 외부 연동 등을 담당합니다.

*   **목적**: 재사용 가능한 비즈니스 로직 캡슐화, 데이터 처리, 외부 서비스 통신.
*   **위치**: `service/lib` 내에 도메인별 폴더 생성.
*   **구조**:
    *   `adapter.ts`: 핵심 기능 제공 (주로 `InitializationSingleTon` 상속받는 싱글톤 클래스).
    *   `store.ts`: (선택) 해당 도메인 관련 전역 상태 (위 스토어 작성 규칙 따름).
    *   `consts.ts`: (선택) 관련 상수 정의.
    *   `types.d.ts`: (선택) 관련 타입 정의.
*   **규칙**:
    *   **View/Application 의존성 금지**: UI나 특정 유스케이스 흐름에 의존하지 않아야 합니다.
    *   싱글톤 패턴 권장 (`shared.ts`의 `InitializationSingleTon` 활용).
    *   필요시 다른 Service에 의존 가능.

### 4.3. Application Hook 작성 (`application/[Domain]/[Action].ts`)

View와 Service를 연결하는 액션 단위 로직입니다.

*   **목적**: 특정 사용자 액션이나 유스케이스 처리 흐름 관리. View의 복잡성 감소.
*   **형태**: React Custom Hook (예: `useSignIn`, `useFetchUserData`).
*   **구조**:
    *   관련 `service`의 함수 호출.
    *   관련 `store` 상태 읽기/쓰기.
    *   필요시 여러 서비스/스토어 로직 조합.
    *   View에서 필요한 상태나 콜백 함수 반환.
*   **규칙**:
    *   훅 형태로 작성하여 View에서 쉽게 사용 가능하도록 함.
    *   재사용성을 고려하여 명확한 액션 단위로 분리.
    *   JSDoc 등을 활용하여 기능, 파라미터, 반환값, 의존성 등 상세히 주석 작성.
    *   새로운 훅 작성 전, 유사 기능 훅 존재 여부 확인.

## 5. 시작하기

### 5.1. 필수 조건

*   Node.js (v18 이상 권장)
*   Yarn 또는 npm
*   Expo CLI (`npm install -g expo-cli`)

### 5.2. 설치

1.  저장소 클론:
    ```bash
    git clone <repository-url> your-project-name
    cd your-project-name
    ```
2.  의존성 설치:
    ```bash
    yarn install
    # 또는
    npm install
    ```
3.  **Firebase 설정 (필수)**:
    *   Firebase 프로젝트에서 Android 앱 (`google-services.json`) 및 iOS 앱 (`GoogleService-Info.plist`) 설정 파일을 다운로드합니다.
    *   다운로드한 파일을 프로젝트 루트 디렉토리에 위치시킵니다.

### 5.3. 개발 서버 실행

```bash
yarn start
# 또는
npm start
```
Expo Go 앱 또는 시뮬레이터/에뮬레이터에서 앱을 실행합니다.

## 6. 주요 기능 사용 가이드

### 6.1. 광고 설정

[TODO: 광고 ID 설정 파일 경로 확인 필요]
광고 단위 ID는 해당 설정 파일에서 관리합니다. (예: `service/lib/Ads/consts.ts` 또는 관련 설정 파일). 프로덕션 ID와 테스트 ID를 구분하여 사용하는 것이 좋습니다.

```typescript
// 예시 (실제 구조에 맞게 수정 필요)
export const AD_UNIT_IDS = {
  // process.env.NODE_ENV === 'production' ? PRODUCTION_IDS : TEST_IDS
  banner: '...',
  interstitial: '...',
  rewarded: '...',
};
```
광고 표시는 `application/ads` 관련 훅을 통해 제어할 수 있습니다.

### 6.2. 웹뷰 사용

`application/webview/useWebView` 훅을 사용하여 앱 내에서 웹 페이지를 엽니다.

```typescript
import { useWebView } from '@/application/webview/useWebView';

const MyComponent = () => {
  const { openWebView } = useWebView();

  return (
    <Button onPress={() => openWebView('https://example.com', '페이지 제목')}>
      웹페이지 열기
    </Button>
  );
};
```

### 6.3. PagerView 사용 (다단계 화면)

`View/hooks/useNestedPagerView` 훅을 사용하여 단계별 화면 전환을 구현합니다.

```typescript
import { useNestedPagerView } from '@/View/hooks/useNestedPagerView';

const PagerViewExample = ({ pagesAmount = 3 }) => {
  const { AnimatedPagerView, currentPage, backToPrev, proceedToNext, resetPager } = useNestedPagerView({ pagesAmount });

  return (
    <View style={{ flex: 1 }}>
      <AnimatedPagerView style={{ flex: 1 }}>
        {/* 각 페이지 컴포넌트 (key 필수) */}
        <View key="1"><Text>Page 1</Text></View>
        <View key="2"><Text>Page 2</Text></View>
        <View key="3"><Text>Page 3</Text></View>
      </AnimatedPagerView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
        <Button onPress={backToPrev} disabled={currentPage === 0}>이전</Button>
        <Text>Page: {currentPage + 1}</Text>
        <Button onPress={proceedToNext} disabled={currentPage === pagesAmount - 1}>다음</Button>
      </View>
    </View>
  );
};
```

## 7. 라이선스

상업적 목적으로 절대 이용하거나 변형하는 작업 등을 진행할 수 없음. (세부 내용은 LICENSE 파일 참조)