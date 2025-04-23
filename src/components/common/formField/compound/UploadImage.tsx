import Image from 'next/image';
import { UploadImageType } from './FileInput';
import clsx from 'clsx';

interface UploadImageProps {
  type: UploadImageType;
  image?: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export default function UploadImage({ type, image, inputRef }: UploadImageProps) {
  const triggerUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  const TEAM = type === 'team';
  const defaultIcon = TEAM ? '/icons/image-icon.svg' : '/icons/user-icon.svg';

  if (type === 'board') {
    return (
      <button
        onClick={triggerUploadClick}
        className="bg-bg200 relative h-[282px] w-[282px] cursor-pointer rounded-xl"
      >
        {image ? (
          <Image src={image} fill alt="profile" className="rounded-xl" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3">
            <div className="bg-bg100 h-12 w-12" />
            <span className="text-gray400 text-lg-rg">이미지 등록</span>
          </div>
        )}
      </button>
    );
  }

  if (type === 'team' || 'user') {
    return (
      <button
        onClick={triggerUploadClick}
        className={clsx(
          'bg-bg200 border-border relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-2',
          TEAM ? 'bg-bg200' : 'bg-bg100'
        )}
      >
        {image ? (
          <Image src={image} fill alt="team image" className="rounded-full" />
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
