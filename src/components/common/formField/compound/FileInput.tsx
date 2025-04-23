'use client';

import { useRef } from 'react';
import Input from './Input';
import UploadImage from './UploadImage';
import { FileInputProps } from '../type';

export default function FileInput({ uploadType = 'user', image, onImageChange }: FileInputProps) {
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
      <UploadImage uploadType={uploadType} image={image} inputRef={inputRef} />
    </div>
  );
}
