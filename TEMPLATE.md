# Expo 앱 템플릿 사용 가이드

이 문서는 이 템플릿을 사용하여 새 프로젝트를 시작하는 방법을 설명합니다.

## 템플릿 사용하기

1. GitHub에서 "Use this template" 버튼을 클릭하여 새 저장소를 생성합니다.
2. 저장소 이름, 설명 등을 입력하고 "Create repository from template" 버튼을 클릭합니다.
3. 새로 생성된 저장소를 로컬 환경에 클론합니다.

## 프로젝트 설정하기

1. 프로젝트 이름 및 정보 업데이트:

   - `package.json` 파일에서 `name`, `version`, `description` 등을 수정합니다.
   - `app.config.ts` 파일에서 앱 ID, 이름, 버전 등을 수정합니다.

2. 광고 ID 설정:

   - `service/lib/Ads/adapter/index.ts` 파일에서 AdMob 광고 ID를 설정합니다.

3. 인증 서비스 설정:
   - `service/inbound/Auth/adapter/index.ts` 파일에서 인증 서비스 설정을 수정합니다.

## 커스터마이징

이 템플릿은 다음과 같은 부분을 쉽게 커스터마이징할 수 있습니다:

1. **테마 설정**:

   - `tamagui.config.ts` 파일에서 테마 색상, 폰트 등을 수정할 수 있습니다.

2. **라우팅 구조**:

   - `app/` 디렉토리 내의 파일 구조를 수정하여 라우팅을 변경할 수 있습니다.

3. **컴포넌트 추가**:

   - `View/core/` 디렉토리에 새로운 UI 컴포넌트를 추가할 수 있습니다.

4. **서비스 추가**:
   - `service/` 디렉토리에 새로운 서비스를 추가할 수 있습니다.

## 배포 준비

1. **앱 아이콘 및 스플래시 스크린**:

   - `assets/` 디렉토리에 앱 아이콘 및 스플래시 스크린 이미지를 추가합니다.
   - `app.config.ts` 파일에서 관련 설정을 수정합니다.

2. **앱 스토어 배포**:
   - Expo EAS를 사용하여 앱을 빌드하고 배포합니다:
   ```bash
   eas build --platform ios
   eas build --platform android
   ```

## 문제 해결

템플릿 사용 중 문제가 발생하면 GitHub 이슈를 통해 문의해 주세요.
