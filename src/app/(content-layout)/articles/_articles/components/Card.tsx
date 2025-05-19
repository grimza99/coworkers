'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types/article';
import ArticleOptionsDropdown from './ArticleOptionsDropdown';
import LikeToggleButton from './LikeToggleButton';

const DEFAULT_IMAGE = process.env.NEXT_PUBLIC_DEFAULT_IMAGE;

export default function Card(props: Article) {
  const { title, image, writer, createdAt, likeCount } = props;

  return (
    <div className="border-bg100 bg-bg200 flex h-44 w-full flex-col gap-6 rounded-lg border px-8 py-6">
      <div className="flex justify-between">
        <Link href={`/articles/${props.id}`}>
          <h3 className="text-2lg-md text-gray300 max-w-75 truncate">{title}</h3>
        </Link>
        <div className="flex items-start gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md md:h-18 md:w-18">
            {image && image !== DEFAULT_IMAGE && (
              <Image src={image} alt="썸네일" fill className="object-cover" />
            )}
          </div>
          <ArticleOptionsDropdown />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-md-md overflow-hidden text-ellipsis whitespace-nowrap">
            {writer.nickname}
          </span>
          <span className="text-bg100">|</span>
          <span className="text-md-md text-gray400">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
        <LikeToggleButton articleId={props.id} likeCount={likeCount} />
      </div>
    </div>
  );
}
