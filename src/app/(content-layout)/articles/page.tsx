'use client';

import dynamic from 'next/dynamic';

const ArticlesPageClient = dynamic(() => import('./ArticlesPageClient'), { ssr: false });

export default function ArticlesPage() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const bestArticles = [...mockArticles].sort((a, b) => b.likeCount - a.likeCount).slice(0, 3);
  const router = useRouter();

  return (
    <main className="">
      <section className="flex flex-col gap-10 pb-10">
        <h1 className="text-2xl-bold">자유게시판</h1>
        <ArticleSearchBar value={searchKeyword} onChange={setSearchKeyword} />
      </section>

      <section className="border-bg200 flex flex-col gap-14 border-b pb-10">
        <div className="flex justify-between">
          <h2 className="text-xl-bold">베스트 게시글</h2>
          <button type="button" className="text-md-rg text-gray400">
            더보기 &gt;
          </button>
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
            <Button className="text-md-md px-2" variant="ghost-primary" size="fullWidth">
              내 게시글 보기
            </Button>
            <SortToggle onSelect={() => {}} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {mockArticles.map((article) => (
            <Card key={article.id} {...article} />
          ))}
        </div>
      </section>

      <Button onClick={() => router.push('/addarticle')} className="fixed right-6 bottom-6">
        {/* 나중에 게시글 생성하기 주소에 맞게 수정 필요 */}+ 글쓰기
      </Button>
    </main>
  );
}
