'use client';

import Image from 'next/image';

export default function BestCard() {
  return (
    <div className="relative h-[220px] w-[387px]">
      {/* Best 뱃지 */}
      <div className="absolute top-4 left-6 flex items-center gap-1">
        <Image width={16} height={16} src="/icons/medal.svg" alt="Best" />
        <span className="text-lg-semi text-white">Best</span>
      </div>

      {/* 카드 본문 */}
      <div className="border-bg100 bg-bg200 flex h-full flex-col gap-5 rounded-lg border px-6 pt-12 pb-4">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between gap-4">
            <h3 className="text-2lg-md text-gray300">
              자유게시판에 질문을 올릴 수 있어요 질문을 올릴까요?
            </h3>
            <div className="h-18 w-18 shrink-0 overflow-hidden rounded-md bg-gray-700">
              <img src="/images/sample-thumbnail.jpg" alt="썸네일" className="h-full w-full" />
            </div>
          </div>
          <div>
            <span className="text-md-md text-gray400">2024.07.25</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="g-3 flex h-8 w-[81px] items-center gap-3">
            <Image width={32} height={32} alt="프로필 이미지" src="/icons/profile-icon.svg" />
            <span className="text-md-md">우지은</span>
          </div>

          <div className="flex gap-1">
            <Image width={16} height={16} alt="like" src="/icons/heart.svg" />
            <span className="text-md-rg text-gray400">9999+</span>
          </div>
        </div>
      </div>
    </div>
  );
}
