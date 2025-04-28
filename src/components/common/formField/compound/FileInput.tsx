'use client';

import { useRef } from 'react';

interface FileInputProps {
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: (props: { inputRef: React.RefObject<HTMLInputElement | null> }) => React.ReactNode;
}

export default function FileInput({ onImageChange, children }: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={onImageChange}
      />
      {children({ inputRef })}
    </div>
  );
}
