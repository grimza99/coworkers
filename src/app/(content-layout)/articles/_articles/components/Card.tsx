'use client';

import { Article } from '@/types/article';
import ArticleOptionsDropdown from './ArticleOptionsDropdown';
import LikeToggleButton from './LikeToggleButton';

export default function Card(props: Article) {
  const { title, image, writer, createdAt, likeCount } = props;

  return (
    <div className="border-bg100 bg-bg200 flex h-[176px] w-full flex-col gap-6 rounded-lg border px-8 py-6">
      <div className="flex justify-between">
        <h3 className="text-2lg-md text-gray300">{title}</h3>
        <div className="flex items-start gap-4">
          <div className="h-18 w-18 overflow-hidden rounded-md bg-gray-700">
            <img src={image} alt="썸네일" className="h-full w-full" />
          </div>
          <ArticleOptionsDropdown />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="g-3 flex h-8 w-[81px] items-center gap-3">
            <img
              width={32}
              height={32}
              alt="프로필 이미지"
              src={writer.image?.trim() ? writer.image : '/icons/profile-icon.svg'}
              className="rounded-full"
            />
            <span className="text-md-md">{writer.nickname}</span>
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
