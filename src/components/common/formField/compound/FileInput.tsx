'use client';

import { useRef } from 'react';
import Input from './Input';
import UploadImage from './UploadImage';
import { FileInputProps } from '../type';

export default function FileInput({
  FileInputUsage = 'user',
  image,
  onImageChange,
}: FileInputProps) {
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
      <UploadImage FileInputUsage={FileInputUsage} image={image} inputRef={inputRef} />
    </div>
  );
}
