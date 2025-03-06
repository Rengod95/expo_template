/**
 * Tamagui 설정
 */

import { createTamagui } from 'tamagui';
import { createInterFont } from '@tamagui/font-inter';
import { shorthands } from '@tamagui/shorthands';
import { defaultConfig } from '@tamagui/config/v4';

import { createAnimations } from '@tamagui/animations-react-native';
import { Easing } from 'react-native-reanimated';

/**
 * 폰트 설정
 */
const headingFont = createInterFont({
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 48,
    12: 56,
    13: 64,
    14: 72,
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
    2: -0.5,
    3: -0.75,
    4: -1,
  },
  face: {
    700: { normal: 'InterBold' },
    500: { normal: 'InterMedium' },
    400: { normal: 'Inter' },
  },
});

const bodyFont = createInterFont({
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 48,
    12: 56,
    13: 64,
    14: 72,
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
    2: -0.5,
    3: -0.75,
    4: -1,
  },
  face: {
    700: { normal: 'InterBold' },
    500: { normal: 'InterMedium' },
    400: { normal: 'Inter' },
  },
});

/**
 * 애니메이션 설정
 */
const animations = createAnimations({
  fast: {
    type: 'timing',
    duration: 300,
    easing: Easing.bezier(0.32, 0.72, 0, 1),
  },
  medium: {
    type: 'timing',
    duration: 500,
    easing: Easing.bezier(0.32, 0.72, 0, 1),
  },
  slow: {
    type: 'timing',
    duration: 700,
    easing: Easing.bezier(0.32, 0.72, 0, 1),
  },
  bouncy: {
    type: 'spring',
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  lazy: {
    type: 'spring',
    damping: 20,
    stiffness: 60,
  },
  quick: {
    type: 'spring',
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
});

// defaultConfig에서 themes와 tokens 추출
const { themes: defaultThemes, tokens } = defaultConfig;

/**
 * 테마 설정
 */
const themes = {
  ...defaultThemes,
  light: {
    background: '#FFFFFF',
    backgroundHover: '#F5F5F5',
    backgroundPress: '#EEEEEE',
    backgroundFocus: '#F9F9F9',
    backgroundStrong: '#F2F2F2',
    backgroundTransparent: 'rgba(255, 255, 255, 0)',

    color: '#000000',
    colorHover: '#111111',
    colorPress: '#222222',
    colorFocus: '#111111',
    colorTransparent: 'rgba(0, 0, 0, 0)',

    borderColor: '#E5E5E5',
    borderColorHover: '#DDDDDD',
    borderColorFocus: '#CCCCCC',
    borderColorPress: '#BBBBBB',

    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowColorHover: 'rgba(0, 0, 0, 0.15)',
    shadowColorPress: 'rgba(0, 0, 0, 0.2)',
    shadowColorFocus: 'rgba(0, 0, 0, 0.15)',

    blue1: '#F0F9FF',
    blue2: '#E1F3FE',
    blue3: '#C3E7FD',
    blue4: '#A5DBFC',
    blue5: '#7CCFFA',
    blue6: '#54C3F9',
    blue7: '#2BB5F8',
    blue8: '#0077E6',
    blue9: '#0066CC',
    blue10: '#0055B3',

    gray1: '#FCFCFC',
    gray2: '#F8F8F8',
    gray3: '#F3F3F3',
    gray4: '#EDEDED',
    gray5: '#E8E8E8',
    gray6: '#DFDFDF',
    gray7: '#C8C8C8',
    gray8: '#8F8F8F',
    gray9: '#6E6E6E',
    gray10: '#4B4B4B',
    gray11: '#2E2E2E',
    gray12: '#1C1C1E',

    red1: '#FFF5F5',
    red2: '#FFE3E3',
    red3: '#FFCCCC',
    red4: '#FFB2B2',
    red5: '#FF9999',
    red6: '#FF7F7F',
    red7: '#FF6666',
    red8: '#FF4D4D',
    red9: '#FF3333',
    red10: '#FF0000',

    green1: '#F2FDF5',
    green2: '#E4FBEB',
    green3: '#D0F7DC',
    green4: '#BCF3CD',
    green5: '#A8EFBE',
    green6: '#94EBAF',
    green7: '#7FE7A0',
    green8: '#34C759',
    green9: '#30B350',
    green10: '#2C9F47',
  },
  dark: {
    background: '#1C1C1E',
    backgroundHover: '#2C2C2E',
    backgroundPress: '#3A3A3C',
    backgroundFocus: '#2C2C2E',
    backgroundStrong: '#000000',
    backgroundTransparent: 'rgba(28, 28, 30, 0)',

    color: '#FFFFFF',
    colorHover: '#F5F5F5',
    colorPress: '#EEEEEE',
    colorFocus: '#F5F5F5',
    colorTransparent: 'rgba(255, 255, 255, 0)',

    borderColor: '#38383A',
    borderColorHover: '#48484A',
    borderColorFocus: '#58585A',
    borderColorPress: '#68686A',

    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowColorHover: 'rgba(0, 0, 0, 0.35)',
    shadowColorPress: 'rgba(0, 0, 0, 0.4)',
    shadowColorFocus: 'rgba(0, 0, 0, 0.35)',

    blue1: '#0D1520',
    blue2: '#102A45',
    blue3: '#134074',
    blue4: '#1553A1',
    blue5: '#1871D5',
    blue6: '#2B8AF9',
    blue7: '#4DA2FF',
    blue8: '#0A84FF',
    blue9: '#409CFF',
    blue10: '#76B8FF',

    gray1: '#1C1C1E',
    gray2: '#2C2C2E',
    gray3: '#3A3A3C',
    gray4: '#48484A',
    gray5: '#636366',
    gray6: '#8E8E93',
    gray7: '#AEAEB2',
    gray8: '#C7C7CC',
    gray9: '#D1D1D6',
    gray10: '#E5E5EA',
    gray11: '#F2F2F7',
    gray12: '#FFFFFF',

    red1: '#2A0A0A',
    red2: '#3B1111',
    red3: '#4D1818',
    red4: '#5E1F1F',
    red5: '#702626',
    red6: '#812D2D',
    red7: '#933434',
    red8: '#FF453A',
    red9: '#FF6961',
    red10: '#FF8C85',

    green1: '#0A1F12',
    green2: '#11321C',
    green3: '#184527',
    green4: '#1F5831',
    green5: '#266B3B',
    green6: '#2D7E45',
    green7: '#34914F',
    green8: '#30D158',
    green9: '#5BD97F',
    green10: '#86E3A1',
  },
};

/**
 * Tamagui 설정
 */
const tamaguiConfig = createTamagui({
  animations,
  defaultTheme: 'light',
  shouldAddPrefersColorThemes: false,
  themeClassNameOnRoot: false,
  shorthands,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  themes,
  tokens,
});

/**
 * 타입 설정
 */
type AppConfig = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig;
