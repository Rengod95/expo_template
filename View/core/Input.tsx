/**
 * 입력 필드 코어 컴포넌트
 */

import React from 'react';
import { Input as TamaguiInput, styled, GetProps } from 'tamagui';

/**
 * 입력 필드 컴포넌트 타입
 */
export type InputProps = GetProps<typeof Input>;

/**
 * 입력 필드 컴포넌트
 *
 * 기본 Tamagui Input에 추가적인 스타일과 기능을 제공합니다.
 */
export const Input = styled(TamaguiInput, {
  name: 'Input',

  // 기본 스타일
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$4',
  paddingVertical: '$3',
  paddingHorizontal: '$4',
  backgroundColor: '$backgroundHover',

  // 변형 스타일
  variants: {
    size: {
      small: {
        height: '$5',
        paddingVertical: '$1',
        paddingHorizontal: '$2',
        fontSize: '$3',
      },
      medium: {
        height: '$6',
        paddingVertical: '$2',
        paddingHorizontal: '$3',
        fontSize: '$4',
      },
      large: {
        height: '$7',
        paddingVertical: '$3',
        paddingHorizontal: '$4',
        fontSize: '$5',
      },
    },
    variant: {
      outlined: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$borderColor',
      },
      filled: {
        backgroundColor: '$backgroundHover',
        borderWidth: 0,
      },
      underlined: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderRadius: 0,
        paddingHorizontal: '$1',
      },
    },
    state: {
      error: {
        borderColor: '$red10',
      },
      success: {
        borderColor: '$green10',
      },
      disabled: {
        opacity: 0.5,
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },
});
