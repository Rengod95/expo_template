/**
 * Tamagui 설정
 */

import {createFont, createTamagui, createTokens} from 'tamagui';
import {createInterFont} from '@tamagui/font-inter';
import {shorthands} from '@tamagui/shorthands';
import {defaultConfig} from '@tamagui/config/v4';

import {createAnimations} from '@tamagui/animations-moti';
import {Easing} from 'react-native-reanimated';
import {customTokens} from '@/tamagui/tokens';
import {defaultTheme} from '@/tamagui/defafultTheme';

/**
 * 폰트 설정 - Apple System UI 기반
 */
const headingFont = createFont({
  family: 'Pretendard',
  size: {
    // Apple System UI 기반 사이즈 체계
    1: 20, // Caption2
    2: 22, // Caption1
    3: 28, // Footnote
    4: 34, // Subheadline
    5: 44, // Body
    6: 52, // Title3
    7: 64, // Title2
    8: 72, // Title1
    9: 80, // LargeTitle
    10: 96, // Display
    11: 112, // Display
    12: 128, // Display
    13: 144, // Display
    14: 160, // Display
  },
  weight: {
    thin: '100',
    extralight: '200',
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  letterSpacing: {
    1: 0,
    2: -0.24, // 작은 텍스트용 자간
    3: -0.5, // 중간 텍스트용 자간
    4: -0.75, // 큰 텍스트용 자간
    5: -1, // 제목용 자간
  },
  face: {
    900: {normal: 'Pretendard-Black'},
    800: {normal: 'Pretendard-ExtraBold'},
    700: {normal: 'Pretendard-Bold'},
    600: {normal: 'Pretendard-SemiBold'},
    500: {normal: 'Pretendard-Medium'},
    400: {normal: 'Pretendard-Regular'},
    300: {normal: 'Pretendard-Light'},
    200: {normal: 'Pretendard-Thin'},
    100: {normal: 'Pretendard-ExtraLight'},
  },
});

const bodyFont = createFont({
  family: 'Pretendard',
  size: {
    // Apple System UI 기반 사이즈 체계
    1: 11, // Caption2
    2: 12, // Caption1
    3: 14, // Footnote
    4: 15, // Subheadline
    5: 17, // Body
    6: 20, // Title3
    7: 22, // Title2
    8: 28, // Title1
    9: 34, // LargeTitle
    10: 40, // Display
    11: 48, // Display
    12: 56, // Display
    13: 64, // Display
    14: 72, // Display
  },
  weight: {
    thin: '100',
    extralight: '200',
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  letterSpacing: {
    1: 0,
    2: -0.24, // 작은 텍스트용 자간
    3: -0.5, // 중간 텍스트용 자간
    4: -0.75, // 큰 텍스트용 자간
    5: -1, // 제목용 자간
  },
  face: {
    900: {normal: 'Pretendard-Black'},
    800: {normal: 'Pretendard-ExtraBold'},
    700: {normal: 'Pretendard-Bold'},
    600: {normal: 'Pretendard-SemiBold'},
    500: {normal: 'Pretendard-Medium'},
    400: {normal: 'Pretendard-Regular'},
    300: {normal: 'Pretendard-Light'},
    200: {normal: 'Pretendard-Thin'},
    100: {normal: 'Pretendard-ExtraLight'},
  },
});

/**
 * 애니메이션 설정
 */
const animations = createAnimations({
  fast: {
    type: 'timing',
    duration: 300,
    easing: Easing.bezier(0.165, 0.72, 0, 1),
  },
  medium: {
    type: 'timing',
    duration: 400,
    easing: Easing.bezier(0.165, 0.72, 0, 1),
  },
  slow: {
    type: 'timing',
    duration: 700,
    easing: Easing.bezier(0.165, 0.72, 0, 1),
  },
});

// defaultConfig에서 themes와 tokens 추출

/**
 * 테마 설정
 */
const themes = {
  ...defaultTheme,
};

const evaluatedTokens = createTokens(customTokens);

/**
 * Tamagui 설정
 */
const tamaguiConfig = createTamagui({
  animations,
  defaultTheme: 'base',
  shouldAddPrefersColorThemes: false,
  themeClassNameOnRoot: false,
  shorthands,
  themes,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  tokens: evaluatedTokens,
  media: {
    xs: {maxWidth: 660},
    gtXs: {minWidth: 660 + 1},
    sm: {maxWidth: 860},
    gtSm: {minWidth: 860 + 1},
    md: {maxWidth: 980},
    gtMd: {minWidth: 980 + 1},
    lg: {maxWidth: 1120},
    gtLg: {minWidth: 1120 + 1},
    short: {maxHeight: 820},
    tall: {minHeight: 820},
    hoverNone: {hover: 'none'},
    pointerCoarse: {pointer: 'coarse'},
  },
});

/**
 * 타입 설정
 */
type AppConfig = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig;
