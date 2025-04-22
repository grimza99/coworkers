import clsx from 'clsx';
import Input from './compound/Input';
import Textarea from './compound/Textarea';
import { InputProps, IOrTProps, TextareaProps } from './type';

export default function FormField({
  textField = 'input',
  gap = '3',
  label,
  required,
  errorMessage,
  ...rest
}: IOrTProps) {
  const GAP_SIZE = {
    '3': 'gap-3',
    '4': 'gap-4',
    '6': 'gap-6',
  } as const;

  return (
    <div className={clsx('flex flex-col', GAP_SIZE[gap])}>
      <label className="text-md-md sm:text-lg-md flex gap-1.5">
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
