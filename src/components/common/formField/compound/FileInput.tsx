'use client';

import { useRef } from 'react';

interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'children'> {
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: (props: { inputRef: React.RefObject<HTMLInputElement | null> }) => React.ReactNode;
}

export default function FileInput({ onImageChange, children, ...rest }: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={onImageChange}
        {...rest}
      />
      {children({ inputRef })}
    </div>
  );
}
