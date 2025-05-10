import Image from 'next/image';
import clsx from 'clsx';
import { ImageUploaderType } from '../type';
import Plus from '@/assets/Plus';

interface ImageUploaderProps {
  imageUploaderType?: ImageUploaderType;
  image: string | null;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export default function ImageUploader({ imageUploaderType, image, inputRef }: ImageUploaderProps) {
  const triggerUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  const TEAM = imageUploaderType === 'team';
  const defaultIcon = TEAM ? '/icons/image-icon.svg' : '/icons/user-icon.svg';

  if (imageUploaderType === 'board') {
    return (
      <button
        onClick={triggerUploadClick}
        className="bg-bg200 relative h-40 w-40 cursor-pointer rounded-xl sm:h-60 sm:w-60"
      >
        {image ? (
          <Image src={image} fill alt="image" className="rounded-xl" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3">
            <Plus className="text-gray400 h-6 w-6 sm:h-12 sm:w-12" />
            <span className="text-gray400 text-md-rg sm:text-lg-rg">이미지 등록</span>
          </div>
        )}
      </button>
    );
  }

  if (imageUploaderType === 'team' || 'user') {
    return (
      <button
        onClick={triggerUploadClick}
        className={clsx(
          'border-border relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-2',
          TEAM ? 'bg-bg200' : 'bg-bg100'
        )}
      >
        {image ? (
          <Image src={image} fill alt="profile" className="rounded-full" />
        ) : (
          <Image
            src={defaultIcon}
            width={TEAM ? 24 : 45}
            height={TEAM ? 24 : 46}
            alt="team image"
          />
        )}
        <Image
          src="/icons/circle-pencil.svg"
          width={18}
          height={18}
          alt="edit"
          className="absolute right-0 bottom-0"
        />
      </button>
    );
  }
}
