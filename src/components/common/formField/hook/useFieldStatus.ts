'use client';

import { useState, useCallback } from 'react';
import { getBorderClassName } from '../style';

export function useFieldStatus({
  isSuccess,
  isFailure,
}: {
  isSuccess?: boolean;
  isFailure?: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    setIsTouched(true);
  }, []);

  const showSuccess = isTouched && isSuccess === true;
  const showError = isTouched && isFailure === true;

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
