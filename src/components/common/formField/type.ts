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
