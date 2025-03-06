/**
 * 텍스트 코어 컴포넌트
 */

import React from 'react';
import { Text as TamaguiText, styled, GetProps } from 'tamagui';

/**
 * 텍스트 컴포넌트 타입
 */
export type TextProps = GetProps<typeof Text>;

/**
 * 텍스트 컴포넌트
 *
 * 기본 Tamagui Text에 추가적인 스타일과 기능을 제공합니다.
 */
export const Text = styled(TamaguiText, {
  name: 'Text',

  // 기본 스타일
  color: '$color',

  // 변형 스타일
  variants: {
    preset: {
      h1: {
        fontSize: '$9',
        fontWeight: 'bold',
        lineHeight: '$9',
      },
      h2: {
        fontSize: '$8',
        fontWeight: 'bold',
        lineHeight: '$8',
      },
      h3: {
        fontSize: '$7',
        fontWeight: 'bold',
        lineHeight: '$7',
      },
      h4: {
        fontSize: '$6',
        fontWeight: 'bold',
        lineHeight: '$6',
      },
      h5: {
        fontSize: '$5',
        fontWeight: 'bold',
        lineHeight: '$5',
      },
      h6: {
        fontSize: '$4',
        fontWeight: 'bold',
        lineHeight: '$4',
      },
      body1: {
        fontSize: '$5',
        lineHeight: '$5',
      },
      body2: {
        fontSize: '$4',
        lineHeight: '$4',
      },
      caption: {
        fontSize: '$3',
        lineHeight: '$3',
      },
      button: {
        fontSize: '$4',
        fontWeight: 'bold',
        lineHeight: '$4',
      },
    },
    weight: {
      light: {
        fontWeight: '300',
      },
      regular: {
        fontWeight: '400',
      },
      medium: {
        fontWeight: '500',
      },
      semibold: {
        fontWeight: '600',
      },
      bold: {
        fontWeight: '700',
      },
    },
    align: {
      left: {
        textAlign: 'left',
      },
      center: {
        textAlign: 'center',
      },
      right: {
        textAlign: 'right',
      },
    },
    color: {
      primary: {
        color: '$blue10',
      },
      secondary: {
        color: '$gray10',
      },
      success: {
        color: '$green10',
      },
      warning: {
        color: '$yellow10',
      },
      error: {
        color: '$red10',
      },
    },
  },
});
