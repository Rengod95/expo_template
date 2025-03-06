/**
 * Button 컴포넌트
 */

import React from 'react';
import { Button as TamaguiButton, styled, Text, Spinner, GetProps } from 'tamagui';
import { clsx } from 'clsx';

/**
 * 스타일이 적용된 Tamagui 버튼
 */
const StyledButton = styled(TamaguiButton, {
  name: 'Button',

  variants: {
    variant: {
      primary: {
        backgroundColor: '$blue8',
        color: 'white',
      },
      secondary: {
        backgroundColor: '$gray5',
        color: '$gray12',
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$blue8',
        color: '$blue8',
      },
      destructive: {
        backgroundColor: '$red8',
        color: 'white',
      },
    },

    size: {
      small: {
        height: 32,
        paddingHorizontal: 12,
        borderRadius: 4,
      },
      medium: {
        height: 40,
        paddingHorizontal: 16,
        borderRadius: 6,
      },
      large: {
        height: 48,
        paddingHorizontal: 20,
        borderRadius: 8,
      },
    },

    fullWidth: {
      true: {
        width: '100%',
      },
    },

    disabled: {
      true: {
        opacity: 0.7,
      },
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'medium',
    fullWidth: false,
    disabled: false,
  },
});

/**
 * Button Props 타입
 */
type ButtonProps = GetProps<typeof StyledButton> & {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
};

/**
 * Button 컴포넌트
 */
export const Button = ({
  children,
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton {...props} disabled={isLoading || disabled} className={clsx('button', className)}>
      {isLoading && (
        <Spinner
          size="small"
          color={props.variant === 'outline' ? '$blue8' : 'white'}
          marginRight={children ? 8 : 0}
        />
      )}
      {!isLoading && leftIcon && <>{leftIcon}</>}
      {children && <Text>{children}</Text>}
      {!isLoading && rightIcon && <>{rightIcon}</>}
    </StyledButton>
  );
};
