/**
 * 버튼 코어 컴포넌트
 */

import React from 'react';
import { Button as TamaguiButton, styled, GetProps } from 'tamagui';

/**
 * 버튼 컴포넌트
 *
 * 기본 Tamagui Button에 추가적인 스타일과 기능을 제공합니다.
 */
export const Button = styled(TamaguiButton, {
  name: 'Button',

  // 기본 스타일
  borderRadius: '$4',
  paddingVertical: '$3',
  paddingHorizontal: '$4',

  // 변형 스타일
  variants: {
    size: {
      small: {
        paddingVertical: '$2',
        paddingHorizontal: '$3',
        fontSize: '$3',
      },
      medium: {
        paddingVertical: '$3',
        paddingHorizontal: '$4',
        fontSize: '$4',
      },
      large: {
        paddingVertical: '$4',
        paddingHorizontal: '$5',
        fontSize: '$5',
      },
    },
    variant: {
      filled: {
        backgroundColor: '$blue10',
        color: 'white',
      },
      outlined: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$blue10',
        color: '$blue10',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$blue10',
      },
      destructive: {
        backgroundColor: '$red10',
        color: 'white',
      },
    },
    fullWidth: {
      true: {
        alignSelf: 'stretch',
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
      },
    },
  },
});

/**
 * 버튼 컴포넌트 타입
 */
export type ButtonProps = GetProps<typeof Button>;
