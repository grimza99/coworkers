'use client';

import clsx from 'clsx';
import { COMMON_TEXTFIELD_STYLE } from '../style';
import { InputProps } from '../type';
import { useFieldStatus } from '../hook/useFieldStatus';

export default function Input({
  leftSlot = null,
  rightSlot = null,
  isSuccess,
  isFail,
  className,
  ref,
  ...rest
}: InputProps) {
  const { isFocused, showSuccess, showError, handleFocus, handleBlur } = useFieldStatus({
    isSuccess,
    isFail,
  });

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
