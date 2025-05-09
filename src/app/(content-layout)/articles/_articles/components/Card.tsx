'use client';

import { Article } from '@/types/article';
import Image from 'next/image';

interface CardProps extends Article {}

export default function Card(props: CardProps) {
  const { title, image, writer, createdAt, likeCount } = props;

  return (
    <div className="border-bg100 bg-bg200 flex h-[176px] w-full flex-col gap-6 rounded-lg border px-8 py-6">
      <div className="flex justify-between">
        <h3 className="text-2lg-md text-gray300">{title}</h3>
        <div className="h-18 w-18 overflow-hidden rounded-md bg-gray-700">
          <img src={image} alt="썸네일" className="h-full w-full" />
        </div>
        {/* 드롭다운*/}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="g-3 flex h-8 w-[81px] items-center gap-3">
            <Image width={32} height={32} alt="프로필 이미지" src="/icons/profile-icon.svg" />
            <span className="text-md-md">{writer.nickname}</span>
          </div>
          <span className="text-bg100">|</span>
          <span className="text-md-md text-gray400">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex gap-1">
          <Image width={16} height={16} alt="like" src="/icons/heart.svg" />
          <span className="text-md-rg text-gray400">{likeCount > 999 ? '999+' : likeCount}</span>
        </div>
      </div>
    </div>
  );
}
