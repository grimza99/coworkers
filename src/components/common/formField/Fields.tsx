'use client';

import clsx from 'clsx';
import { GAP_SIZE, LABEL_SIZE } from './style';
import { FieldProps } from './type';

export default function Fields({
  label,
  required,
  errorMessage,
  gapSize = '12',
  labelSize = '16/16',
  render,
}: FieldProps) {
  const showError = !!errorMessage;

  return (
    <div className="flex w-full flex-col gap-2">
      <div className={clsx('flex flex-col', GAP_SIZE[gapSize])}>
        {label && (
          <label className={clsx('flex gap-1.5', LABEL_SIZE[labelSize])}>
            {required && <span className="text-tertiary text-2lg-bold sm:text-xl-bold">*</span>}
            {label}
          </label>
        )}
        {render()}
      </div>

      {showError && <span className="text-danger text-md-md text-left">{errorMessage}</span>}
    </div>
  );
}
