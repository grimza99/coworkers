'use client';

import { useRef, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import clsx from 'clsx';
import { COMMON_TEXTFIELD_STYLE } from '../style';
import { TextareaProps } from '../type';

export default function Textarea({
  rightSlot = null,
  height = 24,
  isBorder = true,
  className,
  ...rest
}: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = `${height}px`;
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [height]);

  useEffect(() => {
    const handleDebounce = debounce(resizeTextareaHeight, 100);

    window.addEventListener('resize', handleDebounce);

    return () => {
      window.removeEventListener('resize', handleDebounce);
      handleDebounce.cancel();
    };
  }, [resizeTextareaHeight]);

  return (
    <div
      className={clsx(
        'bg-bg200 flex w-full items-start gap-2',
        isBorder && 'border-border rounded-xl border px-4 py-2.5'
      )}
    >
      <textarea
        {...rest}
        ref={textareaRef}
        onInput={resizeTextareaHeight}
        className={clsx(
          'flex w-full resize-none items-center justify-center pt-1',
          COMMON_TEXTFIELD_STYLE,
          className
        )}
        style={{
          height: `${height}px`,
        }}
      />
      {rightSlot}
    </div>
  );
}
