'use client';

import { useRef, useEffect, useCallback } from 'react';
import { TextareaHTMLAttributes } from 'react';
import debounce from 'lodash.debounce';
import clsx from 'clsx';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  rightSlot?: React.ReactNode;
  height?: number;
  className?: string;
}

export default function Textarea({
  rightSlot = null,
  height = 24,
  className,
  ...rest
}: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      const initialHeight = height && height !== 24 ? `${height}px` : '24px';

      textarea.style.height = initialHeight;
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
        'bg-bg200 border-border flex w-full items-start gap-2 rounded-xl border px-4 py-2 sm:px-6 sm:py-4'
      )}
    >
      <textarea
        ref={textareaRef}
        onInput={handleTextareaHeight}
        className={clsx(
          'placeholder:text-gray500 text-md-rg sm:text-lg-rg placeholder:text-md-rg sm:placeholder:text-lg-rg flex max-h-60 w-full resize-none items-center justify-center focus:outline-none',
          className
        )}
        {...rest}
        style={{
          height: height ? `${height}px` : '24px',
        }}
      />
      {rightSlot}
    </div>
  );
}
