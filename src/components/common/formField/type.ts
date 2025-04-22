import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  isSuccess?: boolean;
  isFail?: boolean;
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
  errorMessage?: string;
  gap?: '3' | '4' | '6';
}

export type IOrTProps =
  | (InputProps & FormFieldProps & { textField?: 'input' })
  | (TextareaProps & FormFieldProps & { textField?: 'textarea' });
