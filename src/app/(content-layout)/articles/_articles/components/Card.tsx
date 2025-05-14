'use client';

import Image from 'next/image';
import { Article } from '@/types/article';
import ArticleOptionsDropdown from './ArticleOptionsDropdown';
import LikeToggleButton from './LikeToggleButton';
import Link from 'next/link';

export default function Card(props: Article) {
  const { title, image, writer, createdAt, likeCount } = props;

  return (
    <div className="border-bg100 bg-bg200 flex h-44 w-full flex-col gap-6 rounded-lg border px-8 py-6">
      <div className="flex justify-between">
        <Link href={`/articles/${props.id}`}>
          <h3 className="text-2lg-md text-gray300 max-w-75 truncate">{title}</h3>
        </Link>
        <div className="flex items-start gap-4">
          <div className="h-18 w-18 shrink-0 overflow-hidden rounded-md bg-gray-700">
            <Image width={72} height={72} src={image} alt="썸네일" className="h-full w-full" />
          </div>
          <ArticleOptionsDropdown />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="g-3 flex h-8 max-w-30 items-center gap-3">
            <Image
              width={32}
              height={32}
              alt="프로필 이미지"
              src={writer.image?.trim() ? writer.image : '/icons/profile-icon.svg'}
              className="rounded-full"
            />
            <span className="text-md-md overflow-hidden text-ellipsis whitespace-nowrap">
              {writer.nickname}
            </span>
          </div>
          <span className="text-bg100">|</span>
          <span className="text-md-md text-gray400">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
        <LikeToggleButton isLiked={false} initialCount={likeCount} />
      </div>
    </div>
  );
}
