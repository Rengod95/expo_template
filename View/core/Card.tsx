/**
 * 카드 코어 컴포넌트
 */

import React from 'react';
import { Card as TamaguiCard, styled, GetProps } from 'tamagui';

/**
 * 카드 컴포넌트 타입
 */
export type CardProps = GetProps<typeof Card>;

/**
 * 카드 컴포넌트
 *
 * 기본 Tamagui Card에 추가적인 스타일과 기능을 제공합니다.
 */
export const Card = styled(TamaguiCard, {
  name: 'Card',

  // 기본 스타일
  backgroundColor: '$background',
  borderRadius: '$4',
  padding: '$4',

  // 변형 스타일
  variants: {
    variant: {
      elevated: {
        shadowColor: '$shadowColor',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
      },
      outlined: {
        borderWidth: 1,
        borderColor: '$borderColor',
      },
      filled: {
        backgroundColor: '$backgroundFocus',
      },
    },
    size: {
      small: {
        padding: '$2',
      },
      medium: {
        padding: '$4',
      },
      large: {
        padding: '$6',
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },
});
