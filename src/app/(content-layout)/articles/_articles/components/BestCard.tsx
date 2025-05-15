'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Article } from '@/types/article';
import LikeToggleButton from './LikeToggleButton';

const DEFAULT_IMAGE = process.env.NEXT_PUBLIC_DEFAULT_IMAGE;

export default function BestCard(props: Article) {
  const { title, image, writer, createdAt, likeCount } = props;

  return (
    <div className="relative h-[178px] w-full md:h-55">
      <div className="absolute top-4 left-6 flex items-center gap-1">
        <Image
          src="/icons/medal.svg"
          alt="Best"
          className="h-full w-full object-cover"
          width={16}
          height={16}
        />
        <span className="text-lg-semi text-white">Best</span>
      </div>

      <div className="border-bg100 bg-bg200 flex h-full flex-col gap-1 rounded-lg border px-4 pt-10 pb-4 md:gap-5 md:px-6 md:pt-12 md:pb-4">
        <div className="flex flex-col gap-1 md:gap-3">
          <div className="flex justify-between gap-4">
            <Link href={`/articles/${props.id}`}>
              <h3 className="text-2lg-md text-gray300">
                {title.length > 30 ? `${title.slice(0, 30)}...` : title}
              </h3>
            </Link>
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md md:h-18 md:w-18">
              {image &&
                image.trim() !== '' &&
                image.trim() !== DEFAULT_IMAGE?.replace(/['"\s]/g, '') && (
                  <Image
                    width={72}
                    height={72}
                    src={image}
                    alt="썸네일"
                    className="h-full w-full object-cover"
                  />
                )}
            </div>
          </div>
          <div>
            <span className="text-md-md text-gray400">
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
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

          <div className="flex gap-1">
            <LikeToggleButton articleId={props.id} initialCount={likeCount} />
          </div>
        </div>
      </div>
    </div>
  );
}
