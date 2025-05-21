'use client';

import Image from 'next/image';
import DropDown from '@/components/common/dropdown';
import { GetArticleDetailResponse } from '@/types/article';
import { formatTimeDistance } from '@/utils/date';
import LikeToggleButton from '../../../_articles/components/LikeToggleButton';
import { useUser } from '@/contexts/UserContext';

const ARTICLE_DROPDOWN_OPTIONS = ['수정하기', '삭제하기'];
const DEFAULT_IMAGE = process.env.NEXT_PUBLIC_DEFAULT_IMAGE;

export default function DetailArticleInfo({ detail }: { detail: GetArticleDetailResponse }) {
  const { user } = useUser();

  const isAuthor = user?.id === detail.writer.id;

  return (
    <div className="flex w-full flex-col items-center gap-6 md:flex-row md:items-start">
      {detail.image && detail.image !== DEFAULT_IMAGE && (
        <div className="relative aspect-[1/1] w-full max-w-125 items-center overflow-hidden rounded-2xl md:h-100 md:w-100">
          <Image fill src={detail.image} alt="article-image" />
        </div>
      )}
      <div className="flex w-full flex-1 flex-col gap-12">
        <div>
          <div className="border-border mb-4 flex items-center justify-between border-b pb-4">
            <h1 className="text-lg-md sm:text-2lg-md text-gray300">{detail.title}</h1>
            {isAuthor && (
              <DropDown
                size="md"
                placement="right-0"
                options={ARTICLE_DROPDOWN_OPTIONS}
                onSelect={() => {}}
                dropDownOpenBtn={
                  <Image
                    src="/icons/kebab-icon.svg"
                    width={24}
                    height={24}
                    alt="kebab"
                    className="cursor-pointer"
                  />
                }
              />
            )}
          </div>
          <div className="text-gray400 text-xs-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/icons/profile-icon.svg" width={32} height={32} alt="profile" />
              <div>
                <span className="text-gray100 border-bg100 mr-4 border-r pr-4">
                  {detail.writer.nickname}
                </span>
                <span>{formatTimeDistance(detail.createdAt)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Image src="/icons/comment.svg" width={16} height={16} alt="comment" />
                <span className="text-xs-rg sm:text-md-rg">{detail.commentCount}</span>
              </div>
              <LikeToggleButton
                articleId={detail.id}
                likeCount={detail.likeCount}
                isLiked={detail.isLiked}
              />
            </div>
          </div>
        </div>
        <p className="text-md-rg sm:text-lg-rg text-gray300">{detail.content}</p>
      </div>
    </div>
  );
}
