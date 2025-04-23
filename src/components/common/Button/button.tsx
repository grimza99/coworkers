'use client';

import React, { ReactNode } from 'react';
import { baseStyles, variantStyles, disabledStyles, sizeStyles } from './ButtonStyles';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?:
    | 'primary'
    | 'primary-hover'
    | 'primary-pressed'
    | 'gray'
    | 'text-primary'
    | 'text-hover'
    | 'text-pressed'
    | 'text-gray'
    | 'tp-primary'
    | 'tp-hover'
    | 'tp-pressed'
    | 'tp-gray'
    | 'gray-500'
    | 'red-background';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  onClick,
  children,
  type = 'button',
  ...props
}: ButtonProps) => {
  const composedClassName = [
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    disabled ? disabledStyles : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={composedClassName}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
