'use client';

import clsx from 'clsx';
import { InputHTMLAttributes, useState } from 'react';

interface InputOrTextarea {
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  height?: number;
  value?: string;
  isSuccess?: boolean;
  isFail?: boolean;
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
}

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'height' | 'value'>,
    InputOrTextarea {}

export default function Input({
  leftSlot = null,
  rightSlot = null,
  height = 44,
  value = '',
  isSuccess,
  isFail,
  className,
  ref,
  ...rest
}: InputProps) {
  const [isBlurred, setIsBlurred] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isValueTrim = value.trim() !== '';

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    rest.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setIsBlurred(true);
    rest.onBlur?.(e);
  };

  const showSuccess = isBlurred && (isSuccess ?? isValueTrim);
  const showError = isBlurred && (isFail ?? !isValueTrim);

  return (
    <div
      className={clsx(
        'bg-bg200 flex w-full gap-3 rounded-xl border px-4 py-2.5',
        (isFocused || (!showSuccess && !showError)) && 'border-border',
        !isFocused && showSuccess && 'border-primary',
        !isFocused && showError && 'border-danger',
        className
      )}
      style={{
        height: `${height}px`,
      }}
    >
      {leftSlot}

      <input
        className="placeholder:text-gray500 placeholder:text-md-rg h-full w-full focus:outline-none"
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={ref}
        {...rest}
      />

      {rightSlot}
    </div>
  );
}
