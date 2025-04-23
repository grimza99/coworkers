'use client';

import clsx from 'clsx';
import Input from './compound/Input';
import Textarea from './compound/Textarea';
import { InputProps, InputOrTextareaProps, TextareaProps, FileInputProps } from './type';
import { GAP_SIZE, LABEL_SIZE } from './style';
import { useFieldStatus } from './hook/useFieldStatus';
import FileInput from './compound/FileInput';

export default function FormField({
  field = 'input',
  label,
  required,
  isSuccess,
  isFailure,
  errorMessage,
  gapSize = '12',
  labelSize = '16/16',
  ...rest
}: InputOrTextareaProps) {
  const { isFocused, showError, borderClassName, handleFocus, handleBlur } = useFieldStatus({
    isSuccess,
    isFailure,
    onFocus: (rest as InputProps).onFocus,
    onBlur: (rest as InputProps).onBlur,
  });

  const inputsField = () => {
    if (field === 'textarea') {
      return <Textarea {...(rest as TextareaProps)} />;
    }
    if (field === 'input') {
      return (
        <Input
          onFocus={handleFocus}
          onBlur={handleBlur}
          borderClassName={borderClassName}
          {...(rest as InputProps)}
        />
      );
    }
    if (field === 'file-input') {
      const { uploadType, image, onImageChange } = rest as FileInputProps;
      return <FileInput uploadType={uploadType} image={image} onImageChange={onImageChange} />;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className={clsx('flex flex-col', GAP_SIZE[gapSize])}>
        <label className={clsx('flex gap-1.5', LABEL_SIZE[labelSize])}>
          {required && <span className="text-tertiary text-2lg-bold sm:text-xl-bold">*</span>}
          {label}
        </label>
        {inputsField()}
      </div>
      {!isFocused && showError && errorMessage && (
        <span className="text-danger text-md-md">{errorMessage}</span>
      )}
    </div>
  );
}
