import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
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

export interface FormFieldProps {
  textField: 'input' | 'textarea';
  label: string;
  required?: boolean;
  isSuccess?: boolean;
  isFailure?: boolean;
  errorMessage?: string;
  gapSize?: '12' | '16' | '24';
  labelSize?: '16/16' | '14/16' | '16/20';
}

export type InputOrTextareaProps =
  | (InputProps & FormFieldProps & { textField?: 'input' })
  | (TextareaProps & FormFieldProps & { textField?: 'textarea' });
