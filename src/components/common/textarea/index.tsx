'use client';

import { useRef, useEffect, useCallback, TextareaHTMLAttributes } from 'react';
import debounce from 'lodash.debounce';
import clsx from 'clsx';
import { SHARE_TEXTFIELD_STYLE } from '../input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  rightSlot?: React.ReactNode;
  height?: number;
  borderNone?: boolean;
  className?: string;
}

export default function Textarea({
  rightSlot = null,
  height = 24,
  borderNone = false,
  className,
  ...rest
}: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = `${height}px`;
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [height]);

  useEffect(() => {
    const handleDebounce = debounce(handleTextareaHeight, 100);

    window.addEventListener('resize', handleDebounce);

    return () => {
      window.removeEventListener('resize', handleDebounce);
      handleDebounce.cancel();
    };
  }, [handleTextareaHeight]);

  return (
    <div
      className={clsx(
        'bg-bg200 flex w-full items-start gap-2',
        !borderNone && 'border-border rounded-xl border px-4 py-2 sm:px-6 sm:py-4'
      )}
    >
      <textarea
        ref={textareaRef}
        onInput={handleTextareaHeight}
        className={clsx(
          'flex w-full resize-none items-center justify-center pt-1',
          SHARE_TEXTFIELD_STYLE,
          className
        )}
        {...rest}
        style={{
          height: `${height}px`,
        }}
      />
      {rightSlot}
    </div>
  );
}
