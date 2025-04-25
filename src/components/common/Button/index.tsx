'use client';

import clsx from 'clsx';
import * as B from './style';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: B.ButtonVariant;
  size?: B.ButtonSize;
  fontSize?: B.FontSize;
  disabled?: boolean;
  leftSlot?: React.ReactNode;
  children: React.ReactNode;
}

export default function Button({
  variant = 'solid',
  size = 'md',
  fontSize = '16',
  disabled,
  className,
  leftSlot = null,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      {...props}
      disabled={disabled}
      className={clsx(
        'flex items-center justify-center',
        B.buttonSize[size],
        B.buttonFontSize[fontSize],
        disabled ? B.disabledButton[variant] : B.buttonVariant[variant],
        className
      )}
      style={
        variant === 'gradient'
          ? {
              backgroundImage: 'var(--color-gradient)',
            }
          : undefined
      }
    >
      {leftSlot}

      {children}
    </button>
  );
}
