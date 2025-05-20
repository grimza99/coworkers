export function BestCardSkeleton() {
  return (
    <section className="border-bg200 space-y-6 border-b pb-10">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-bg200 h-44 rounded" />
        <div className="bg-bg200 h-44 rounded" />
        <div className="bg-bg200 h-44 rounded" />
      </div>
    </section>
  );
}

export function CardSkeleton() {
  return (
    <section className="space-y-6 pt-10">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-bg200 h-36 rounded" />
        ))}
      </div>
    </section>
  );
}
