'use client';

import Button from '@/components/common/Button';

export default function ArticlesPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-8">
      <section className="mb-8">
        <h1 className="mb-4 text-2xl font-bold">자유게시판</h1>
      </section>

      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">베스트 게시글</h2>
          <button className="text-sm text-gray-400 hover:text-white">더보기 &gt;</button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* 베스트 카드 3개 예시 */}
        </div>
      </section>

      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">게시글</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{/* 일반 카드 예시 */}</div>
      </section>

      <Button>+ 글쓰기</Button>
    </main>
  );
}
