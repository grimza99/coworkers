import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { GAP_SIZE, LABEL_SIZE } from './style';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  hasError?: boolean;
  borderClassName?: string;
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  rightSlot?: React.ReactNode;
  height?: number;
  isBorder?: boolean;
  className?: string;
}

// 삭제 예정
export type ImageUploaderType = 'board' | 'team' | 'user';

export interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  // imageUploaderType 삭제 예정
  imageUploaderType?: ImageUploaderType;
  image: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// 삭제 예정
export interface FormFieldProps {
  field: 'input' | 'textarea' | 'file-input';
  imageUploaderType?: ImageUploaderType;
  label?: string;
  required?: boolean;
  isSuccess?: boolean;
  isFailure?: boolean;
  isSubmit?: boolean;
  errorMessage?: string;
  gapSize?: '12' | '16' | '24' | '32';
  labelSize?: '16/16' | '14/16' | '16/20';
  onFieldFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFieldBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export interface FieldProps {
  label?: string;
  required?: boolean;
  errorMessage?: string;
  gapSize?: keyof typeof GAP_SIZE;
  labelSize?: keyof typeof LABEL_SIZE;
  render: () => React.ReactNode;
}

// 삭제 에정
export type FieldComponentProps =
  | (InputProps & FormFieldProps & { field?: 'input' })
  | (TextareaProps & FormFieldProps & { field?: 'textarea' })
  | (FileInputProps & FormFieldProps & { field?: 'file-input' });
