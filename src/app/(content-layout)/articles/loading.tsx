import { BestCardSkeleton, CardSkeleton } from './_articles/components/Skeleton';

export default function ArticlesPageLoading() {
  return (
    <main className="flex animate-pulse flex-col gap-6 pb-25">
      <BestCardSkeleton />
      <div className="flex flex-col gap-4">
        <CardSkeleton />
      </div>
    </main>
  );
}
