'use client';

import { useRef } from 'react';
import Input from './Input';
import UploadImage from './UploadImage';

export type UploadImageType = 'board' | 'team' | 'user';

interface FileInputProps {
  type: UploadImageType;
  image?: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FileInput({ type = 'user', image, onImageChange }: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <Input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={onImageChange}
      />
      <UploadImage type={type} image={image} inputRef={inputRef} />
    </div>
  );
}
