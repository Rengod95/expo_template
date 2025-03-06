import {ExpoConfig, ConfigContext} from 'expo/config';

/** @change 앱 슬러그 수정 필요 */
const APP_SLUG = 'temp-expo';

// 환경 타입 정의
type Environment = 'development' | 'staging' | 'production';

// 광고 ID 타입 정의
interface AdMobConfig {
  androidAppId: string;
  iosAppId: string;
  banner: string;
  interstitial: string;
  rewarded: string;
  rewardedInterstitial: string;
  appOpen: string;
}

// 환경별 설정 타입 정의
interface EnvConfig {
  appName: string;
  icon: string;
  adaptiveIcon: {
    foregroundImage: string;
    backgroundColor: string;
  };
  bundleIdentifier: string;
  adMob: AdMobConfig;
}

// 환경별 설정
const ENV: Record<Environment, EnvConfig> = {
  development: {
    /** @change 앱 이름 수정 필요 */
    appName: '[DEV] Temp Expo',
    icon: './assets/icon.png',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    /** @change 번들 식별자 수정 필요 */
    bundleIdentifier: 'com.inlee.templateReactNative.dev',
    /** @change 광고 ID 수정 필요 */
    adMob: {
      androidAppId: 'ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy',
      iosAppId: 'ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy',
      banner: 'ca-app-pub-xxxxxxxxxxxxxxxx/dev-banner',
      interstitial: 'ca-app-pub-xxxxxxxxxxxxxxxx/dev-interstitial',
      rewarded: 'ca-app-pub-xxxxxxxxxxxxxxxx/dev-rewarded',
      rewardedInterstitial: 'ca-app-pub-xxxxxxxxxxxxxxxx/dev-rewarded-interstitial',
      appOpen: 'ca-app-pub-xxxxxxxxxxxxxxxx/dev-app-open',
    },
  },
  staging: {
    /** @change 앱 이름 수정 필요 */
    appName: '[STG] Temp Expo',
    icon: './assets/icon.png',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    /** @change 번들 식별자 수정 필요 */
    bundleIdentifier: 'com.inlee.templateReactNative.staging',
    /** @change 광고 ID 수정 필요 */
    adMob: {
      androidAppId: 'ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy',
      iosAppId: 'ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy',
      banner: 'ca-app-pub-xxxxxxxxxxxxxxxx/stg-banner',
      interstitial: 'ca-app-pub-xxxxxxxxxxxxxxxx/stg-interstitial',
      rewarded: 'ca-app-pub-xxxxxxxxxxxxxxxx/stg-rewarded',
      rewardedInterstitial: 'ca-app-pub-xxxxxxxxxxxxxxxx/stg-rewarded-interstitial',
      appOpen: 'ca-app-pub-xxxxxxxxxxxxxxxx/stg-app-open',
    },
  },
  production: {
    /** @change 앱 이름 수정 필요 */
    appName: 'Temp Expo',
    icon: './assets/icon.png',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    /** @change 번들 식별자 수정 필요 */
    bundleIdentifier: 'com.inlee.templateReactNative',
    /** @change 광고 ID 수정 필요 */
    adMob: {
      androidAppId: 'ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy',
      iosAppId: 'ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy',
      banner: 'ca-app-pub-xxxxxxxxxxxxxxxx/prod-banner',
      interstitial: 'ca-app-pub-xxxxxxxxxxxxxxxx/prod-interstitial',
      rewarded: 'ca-app-pub-xxxxxxxxxxxxxxxx/prod-rewarded',
      rewardedInterstitial: 'ca-app-pub-xxxxxxxxxxxxxxxx/prod-rewarded-interstitial',
      appOpen: 'ca-app-pub-xxxxxxxxxxxxxxxx/prod-app-open',
    },
  },
};

// 플러그인 타입 정의
type Plugin = string | [string, any] | [] | [string];

// 라우터 플러그인
const EXPO_ROUTER_PLUGIN: Plugin = 'expo-router';

// 광고 플러그인
const getAdMobPlugin = (environment: Environment): Plugin => [
  'react-native-google-mobile-ads',
  {
    androidAppId: ENV[environment].adMob.androidAppId,
    iosAppId: ENV[environment].adMob.iosAppId,
    userTrackingPermission: '이 앱은 귀하에게 더 관련성 높은 광고를 제공하기 위해 디바이스 식별자와 같은 데이터를 사용합니다. 이를 허용하시겠습니까?',
    // SKAdNetwork 식별자 목록
    skAdNetworkItems: [
      'cstr6suwn9.skadnetwork',
      '4fzdc2evr5.skadnetwork',
      '2fnua5tdw4.skadnetwork',
      'ydx93a7ass.skadnetwork',
      'p78axxw29g.skadnetwork',
      'v72qych5uu.skadnetwork',
      'ludvb6z3bs.skadnetwork',
      'cp8zw746q7.skadnetwork',
      '3sh42y64q3.skadnetwork',
      'c6k4g5qg8m.skadnetwork',
      's39g8k73mm.skadnetwork',
      '3qy4746246.skadnetwork',
      'hs6bdukanm.skadnetwork',
      'mlmmfzh3r3.skadnetwork',
      'v4nxqhlyqp.skadnetwork',
      'wzmmz9fp6w.skadnetwork',
      'su67r6k2v3.skadnetwork',
      'yclnxrl5pm.skadnetwork',
      '7ug5zh24hu.skadnetwork',
      'gta9lk7p23.skadnetwork',
      'vutu7akeur.skadnetwork',
      'y5ghdn5j9k.skadnetwork',
      'v9wttpbfk9.skadnetwork',
      'n38lu8286q.skadnetwork',
      '47vhws6wlr.skadnetwork',
      'kbd757ywx3.skadnetwork',
      '9t245vhmpl.skadnetwork',
      'a2p9lx4jpn.skadnetwork',
      '22mmun2rn5.skadnetwork',
      '4468km3ulz.skadnetwork',
      '2u9pt9hc89.skadnetwork',
      '8s468mfl3y.skadnetwork',
      'ppxm28t8ap.skadnetwork',
      'uw77j35x4d.skadnetwork',
      'pwa73g5rt2.skadnetwork',
      '578prtvx9j.skadnetwork',
      '4dzt52r2t5.skadnetwork',
      'tl55sbb4fm.skadnetwork',
      'e5fvkxwrpn.skadnetwork',
      '8c4e2ghe7u.skadnetwork',
      '3rd42ekr43.skadnetwork',
      '3qcr597p9d.skadnetwork',
    ],
  },
];

const DEV_CLIENT_PLUGIN: Plugin = [
  'expo-dev-client',
  {
    launchMode: 'most-recent',
  },
];

const EXPO_CAMERA_PLUGIN: Plugin = [
  'expo-camera',
  {
    cameraPermission: 'Allow to access your camera',
    microphonePermission: 'Allow to access your microphone',
    recordAudioAndroid: true,
  },
];

const EXPO_ASSETS_PLUGIN: Plugin = [
  'expo-asset',
  {
    assets: ['./assets'],
  },
];

export default ({config}: ConfigContext): ExpoConfig => {
  // 현재 환경 설정 (기본값: development)
  const appVariant = process.env.APP_VARIANT || 'development';
  const environment = appVariant as Environment;
  const envConfig = ENV[environment];

  return {
    ...config,
    name: envConfig.appName,
    scheme: APP_SLUG,
    slug: APP_SLUG,
    version: '1.0.0',
    orientation: 'portrait',
    icon: envConfig.icon,
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: envConfig.bundleIdentifier,
      appleTeamId: '3MNYG65CXY',
    },
    android: {
      adaptiveIcon: envConfig.adaptiveIcon,
      package: envConfig.bundleIdentifier,
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [EXPO_ROUTER_PLUGIN, getAdMobPlugin(environment), DEV_CLIENT_PLUGIN, EXPO_CAMERA_PLUGIN, EXPO_ASSETS_PLUGIN],
    extra: {
      APP_VARIANT: environment,
      adMob: envConfig.adMob,
    },
  };
};
