'use client';

import { Article } from '@/types/article';
import Image from 'next/image';

export default function BestCard(props: Article) {
  const { title, image, writer, createdAt, likeCount } = props;

  return (
    <div className="relative h-[178px] w-full md:h-[220px]">
      <div className="absolute top-4 left-6 flex items-center gap-1">
        <Image width={16} height={16} src="/icons/medal.svg" alt="Best" />
        <span className="text-lg-semi text-white">Best</span>
      </div>

      <div className="border-bg100 bg-bg200 flex h-full flex-col gap-1 rounded-lg border px-4 pt-10 pb-4 md:gap-5 md:px-6 md:pt-12 md:pb-4">
        <div className="flex flex-col gap-1 md:gap-3">
          <div className="flex justify-between gap-4">
            <h3 className="text-2lg-md text-gray300">{title}</h3>
            <div className="h-[64px] w-[64px] shrink-0 overflow-hidden rounded-md bg-gray-700 md:h-18 md:w-18">
              <img src={image} alt="썸네일" className="h-full w-full" />
            </div>
          </div>
          <div>
            <span className="text-md-md text-gray400">
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="g-3 flex h-8 w-[81px] items-center gap-3">
            <Image
              width={32}
              height={32}
              alt="프로필 이미지"
              src={writer.image ?? '/icons/profile-icon.svg'}
            />
            <span className="text-md-md">{writer.nickname}</span>
          </div>

          <div className="flex gap-1">
            <Image width={16} height={16} alt="like" src="/icons/heart.svg" />
            <span className="text-md-rg text-gray400">{likeCount > 999 ? '999+' : likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
