'use client';

import { useRef } from 'react';
import Input from './Input';
import ImageUploader from './ImageUploader';
import { FileInputProps } from '../type';

export default function FileInput({
  imageUploaderType = 'user',
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
      <ImageUploader imageUploaderType={imageUploaderType} image={image} inputRef={inputRef} />
    </div>
  );
}
