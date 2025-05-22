'use client';

import { useEffect, useState, useMemo, Suspense, lazy } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import debounce from 'lodash.debounce';
import axiosClient from '@/lib/axiosClient';
import PATHS from '@/constants/paths';
import { Article, GetArticlesResponse } from '@/types/article';
import ArticleSearchBar from './_articles/components/ArticleSearchBar';
import Button from '@/components/common/Button';
import BestCard from './_articles/components/BestCard';
import SortToggle from './_articles/components/SortToggle';
import Pagination from './_articles/components/Pagination';
import { Toast } from '@/components/common/Toastify';
import { BestCardSkeleton, CardSkeleton } from './_articles/components/Skeleton';
import Image from 'next/image';
import { useUser } from '@/contexts/UserContext';

const Card = lazy(() => import('./_articles/components/Card'));

export default function ArticlesPageClient() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [bestArticles, setBestArticles] = useState<Article[]>([]);
  const [isLoadingBest, setIsLoadingBest] = useState(true);
  const [orderBy, setOrderBy] = useState<'recent' | 'like'>('recent');
  const [myArticlesOnly, setMyArticlesOnly] = useState(false);

  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get('keyword') ?? '');
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const router = useRouter();
  const { user } = useUser();

  const updateKeyword = useMemo(
    () =>
      debounce((v: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (v) {
          params.set('keyword', v);
        } else {
          params.delete('keyword');
        }
        router.replace(`/articles?${params.toString()}`);
      }, 1000),
    [router, searchParams]
  );

  useEffect(() => {
    updateKeyword(searchInput);
  }, [searchInput, updateKeyword]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchInput) {
      params.set('keyword', searchInput);
    } else {
      params.delete('keyword');
    }
    router.push(`/articles?${params.toString()}`);
  };

  useEffect(() => {
    const fetchBestArticles = async () => {
      setIsLoadingBest(true);
      try {
        const res = await axiosClient.get<GetArticlesResponse>('/articles', {
          params: {
            page: 1,
            pageSize: 100,
            orderBy: 'like',
          },
        });
        const sortedByLike = res.data.list.toSorted((a, b) => b.likeCount - a.likeCount);
        setBestArticles(sortedByLike.slice(0, 3));
      } catch (error) {
        Toast.error('베스트 게시글을 불러오는 데 실패했습니다.');
        console.error('베스트 게시글을 불러오기 실패', error);
      } finally {
        setIsLoadingBest(false);
      }
    };
    fetchBestArticles();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axiosClient.get('/articles', {
          params: {
            page: currentPage,
            pageSize,
            orderBy,
            keyword: searchInput,
          },
        });

        const allArticles = res.data.list;
        const userId = user?.id ?? null;
        const filtered =
          myArticlesOnly && userId
            ? allArticles.filter((article: Article) => article.writer.id === userId)
            : allArticles;
        setArticles(filtered);
        setTotalCount(res.data.totalCount);
      } catch (error) {
        console.error('게시글 불러오기 실패:', error);
        Toast.error('게시글을 불러오는 데 실패했습니다.');
      }
    };
    fetchArticles();
  }, [currentPage, orderBy, myArticlesOnly, searchInput, user]);

  return (
    <main className="">
      <section className="flex flex-col gap-10 pb-10">
        <h1 className="text-2xl-bold">자유게시판</h1>
        <ArticleSearchBar value={searchInput} onChange={setSearchInput} onEnter={handleSearch} />
      </section>

      <section className="border-bg200 flex flex-col gap-14 border-b pb-10">
        <div className="flex justify-between">
          <h2 className="text-xl-bold">베스트 게시글</h2>
        </div>
        {isLoadingBest ? (
          <BestCardSkeleton />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {bestArticles.slice(0, 1).map((article) => (
              <BestCard key={`sm-${article.id}`} {...article} className="block md:hidden" />
            ))}
            {bestArticles.slice(0, 2).map((article) => (
              <BestCard
                key={`md-${article.id}`}
                {...article}
                className="hidden md:block lg:hidden"
              />
            ))}
            {bestArticles.slice(0, 3).map((article) => (
              <BestCard key={`lg-${article.id}`} {...article} className="hidden lg:block" />
            ))}
          </div>
        )}
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
                setCurrentPage(1);
              }}
            >
              {myArticlesOnly ? '전체 게시글 보기' : '내 게시글 보기'}
            </Button>
            <SortToggle
              onSelect={(selected) => {
                const apiValue = selected === '최신순' ? 'recent' : 'like';
                setOrderBy(apiValue);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
        <Suspense fallback={<CardSkeleton />}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {articles.map((article) => (
              <Card
                key={article.id}
                {...article}
                title={
                  article.title.length > 30 ? article.title.slice(0, 30) + '...' : article.title
                }
              />
            ))}
          </div>
        </Suspense>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalCount / pageSize)}
          onPageChange={setCurrentPage}
        />
      </section>

      <Button
        onClick={() => router.push(`${PATHS.ARTICLES.NEW}`)}
        className="fixed right-6 bottom-6 gap-1"
      >
        <Image width={16} height={16} alt="게시글 추가버튼" src="/icons/plus.svg" /> 글쓰기
      </Button>
    </main>
  );
}
