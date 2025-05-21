import { Suspense } from 'react';
import { Metadata } from 'next';
import ArticlesPageClient from './ArticlesPageClient';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '자유게시판 | Coworkers',
    openGraph: {
      title: '자유게시판 | Coworkers',
      description: '자유롭게 게시글을 작성하고 소통할 수 있는 공간입니다.',
      siteName: 'Coworkers',
    },
  };
}

export default function Page() {
  return (
    <Suspense>
      <ArticlesPageClient />
    </Suspense>
  );
}
