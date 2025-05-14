'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import Card from './_articles/components/Card';
import BestCard from './_articles/components/BestCard';
import SortToggle from './_articles/components/SortToggle';
import ArticleSearchBar from './_articles/components/ArticleSearchBar';
import Pagination from './_articles/components/Pagination';
import { Article } from '@/types/article';
import axiosClient from '@/lib/axiosClient';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [bestArticles, setBestArticles] = useState<Article[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState<'recent' | 'like'>('recent');
  const [myArticlesOnly, setMyArticlesOnly] = useState(false);
  const pageSize = 10;
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axiosClient.get('/articles', {
          params: {
            page: currentPage,
            pageSize,
            orderBy,
          },
        });

        const allArticles = res.data.list;

        const storedUserId = localStorage.getItem('userId');
        const userId = storedUserId ? parseInt(storedUserId, 10) : null;

        const filtered =
          myArticlesOnly && userId
            ? allArticles.filter((article: Article) => article.writer.id === userId)
            : allArticles;

        setArticles(filtered);
        setTotalCount(res.data.totalCount);

        const sortedByLike = [...filtered].sort((a, b) => b.likeCount - a.likeCount);
        setBestArticles(sortedByLike.slice(0, 3));
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [currentPage, orderBy, myArticlesOnly]);

  return (
    <main className="">
      <section className="flex flex-col gap-10 pb-10">
        <h1 className="text-2xl-bold">자유게시판</h1>
        <ArticleSearchBar value={searchKeyword} onChange={setSearchKeyword} />
      </section>

      <section className="border-bg200 flex flex-col gap-14 border-b pb-10">
        <div className="flex justify-between">
          <h2 className="text-xl-bold">베스트 게시글</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bestArticles.map((article) => (
            <BestCard key={article.id} {...article} />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-8 pt-10">
        <div className="flex items-start justify-between">
          <h2 className="text-xl-bold">게시글</h2>
          <div className="flex items-center gap-4">
            <Button
              className="text-md-md px-2"
              variant="ghost-primary"
              size="fullWidth"
              onClick={() => {
                setMyArticlesOnly((prev) => !prev);
                setCurrentPage(1); // reset to first page when toggled
              }}
            >
              {myArticlesOnly ? '전체 게시글 보기' : '내 게시글 보기'}
            </Button>
            <SortToggle
              onSelect={(selected) => {
                const apiValue = selected === '최신순' ? 'recent' : 'like';
                setOrderBy(apiValue);
                setCurrentPage(1); // reset to first page when sort changes
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {articles.map((article) => (
            <Card
              key={article.id}
              {...article}
              title={article.title.length > 30 ? article.title.slice(0, 30) + '...' : article.title}
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalCount / pageSize)}
          onPageChange={setCurrentPage}
        />
      </section>

      <Button onClick={() => router.push('/addarticle')} className="fixed right-6 bottom-6">
        {/* 나중에 게시글 생성하기 주소에 맞게 수정 필요 */}+ 글쓰기
      </Button>
    </main>
  );
}
