'use client';

import clsx from 'clsx';
import Input from './compound/Input';
import Textarea from './compound/Textarea';
import { InputProps, InputOrTextareaProps, TextareaProps } from './type';
import { GAP_SIZE, LABEL_SIZE } from './style';
import { useFieldStatus } from './hook/useFieldStatus';

export default function FormField({
  textField = 'input',
  label,
  required,
  isSuccess,
  isFailure,
  errorMessage,
  gapSize = '3',
  labelSize = '16/16',
  ...rest
}: InputOrTextareaProps) {
  const { isFocused, showError, borderClassName, handleFocus, handleBlur } = useFieldStatus({
    isSuccess,
    isFailure,
    onFocus: (rest as InputProps).onFocus,
    onBlur: (rest as InputProps).onBlur,
  });

  return (
    <div className={clsx('flex flex-col', GAP_SIZE[gapSize])}>
      <label className={clsx('flex gap-1.5', LABEL_SIZE[labelSize])}>
        {required && <span className="text-tertiary text-2lg-bold sm:text-xl-bold">*</span>}
        {label}
      </label>
      {textField === 'textarea' ? (
        <Textarea {...(rest as TextareaProps)} />
      ) : (
        <Input
          onFocus={handleFocus}
          onBlur={handleBlur}
          borderClassName={borderClassName}
          {...(rest as InputProps)}
        />
      )}
      {!isFocused && showError && errorMessage && (
        <span className="text-danger text-md-md">{errorMessage}</span>
      )}
    </div>
  );
}
