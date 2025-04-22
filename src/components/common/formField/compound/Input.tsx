'use client';

import { InputHTMLAttributes, useState } from 'react';
import clsx from 'clsx';
import { COMMON_TEXTFIELD_STYLE } from './style';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  isSuccess?: boolean;
  isFail?: boolean;
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export default function Input({
  leftSlot = null,
  rightSlot = null,
  isSuccess,
  isFail,
  className,
  ref,
  ...rest
}: InputProps) {
  const [isBlurred, setIsBlurred] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    rest.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setIsBlurred(true);
    rest.onBlur?.(e);
  };

  const showSuccess = isBlurred && isSuccess === true;
  const showError = isBlurred && isFail === true;

  return (
    <div
      className={clsx(
        'bg-bg200 flex h-11 w-full gap-3 rounded-xl border px-4 py-2.5 sm:h-12',
        (isFocused || (!showSuccess && !showError)) && 'border-border',
        !isFocused && showSuccess && 'border-primary',
        !isFocused && showError && 'border-danger',
        className
      )}
    >
      {leftSlot}

      <input
        className={clsx('w-full', COMMON_TEXTFIELD_STYLE)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={ref}
        {...rest}
      />

      {rightSlot}
    </div>
  );
}
