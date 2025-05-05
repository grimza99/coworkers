'use client';

import { useState, useCallback } from 'react';
import { getBorderClassName } from '../style';

interface UseFieldStatusProps {
  isSuccess?: boolean;
  isFailure?: boolean;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  forceShowError?: boolean;
}

export function useFieldStatus({
  isSuccess,
  isFailure,
  onFocus,
  onBlur,
  forceShowError = false,
}: UseFieldStatusProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);

      onFocus?.(e);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setIsTouched(true);

      onBlur?.(e);
    },
    [onBlur]
  );

  const showSuccess = (isTouched || forceShowError) && isSuccess === true;
  const showError = (isTouched || forceShowError) && isFailure === true;

  const borderClassName = getBorderClassName({ isFocused, showSuccess, showError });

  return {
    isFocused,
    isTouched,
    showSuccess,
    showError,
    borderClassName,
    handleFocus,
    handleBlur,
  };
}
