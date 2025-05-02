'use client';

import clsx from 'clsx';
import Input from './compound/Input';
import Textarea from './compound/Textarea';
import { InputProps, FieldComponentProps, TextareaProps, FileInputProps } from './type';
import { GAP_SIZE, LABEL_SIZE } from './style';
import { useFieldStatus } from './hook/useFieldStatus';
import FileInput from './compound/FileInput';
import ImageUploader from './compound/ImageUploader';

export default function FormField({
  field = 'input',
  imageUploaderType,
  label,
  required,
  isSuccess,
  isFailure,
  errorMessage,
  gapSize = '12',
  labelSize = '16/16',
  onFieldFocus,
  onFieldBlur,
  ...rest
}: FieldComponentProps) {
  const { isFocused, showError, borderClassName, handleFocus, handleBlur } = useFieldStatus({
    isSuccess,
    isFailure,
    onFocus: onFieldFocus,
    onBlur: onFieldBlur,
    forceShowError: !!errorMessage,
  });

  const renderField = () => {
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
      const { image } = rest as FileInputProps;
      return (
        <FileInput {...(rest as FileInputProps)}>
          {({ inputRef }) => (
            <ImageUploader
              imageUploaderType={imageUploaderType}
              image={image}
              inputRef={inputRef}
            />
          )}
        </FileInput>
      );
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className={clsx('flex flex-col', GAP_SIZE[gapSize])}>
        <label className={clsx('flex gap-1.5', LABEL_SIZE[labelSize])}>
          {required && <span className="text-tertiary text-2lg-bold sm:text-xl-bold">*</span>}
          {label}
        </label>
        {renderField()}
      </div>
      {(field === 'file-input' ? errorMessage : !isFocused && showError && errorMessage) && (
        <span className="text-danger text-md-md text-left">{errorMessage}</span>
      )}
    </div>
  );
}
