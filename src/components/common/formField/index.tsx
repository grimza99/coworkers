import clsx from 'clsx';
import Input from './compound/Input';
import Textarea from './compound/Textarea';
import { InputProps, InputOrTextareaProps, TextareaProps } from './type';
import { GAP_SIZE, LABEL_SIZE } from './style';

export default function FormField({
  textField = 'input',
  label,
  required,
  errorMessage,
  gapSize = '3',
  labelSize = '16/16',
  ...rest
}: InputOrTextareaProps) {
  return (
    <div className={clsx('flex flex-col', GAP_SIZE[gapSize])}>
      <label className={clsx('flex gap-1.5', LABEL_SIZE[labelSize])}>
        {required && <span className="text-tertiary text-2lg-bold sm:text-xl-bold">*</span>}
        {label}
      </label>
      {textField === 'textarea' ? (
        <Textarea {...(rest as TextareaProps)} />
      ) : (
        <Input {...(rest as InputProps)} />
      )}
      {(rest as InputProps).isFail && errorMessage && (
        <span className="text-danger text-md-md">{errorMessage}</span>
      )}
    </div>
  );
}
