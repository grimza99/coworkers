export function BestCardSkeleton() {
  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-bg200 block h-45 rounded-lg md:h-55" />
        <div className="bg-bg200 hidden h-55 rounded-lg md:block" />
        <div className="bg-bg200 hidden h-55 rounded-lg lg:block" />
      </div>
    </section>
  );
}

export function CardSkeleton() {
  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-bg200 h-44 rounded-lg" />
        ))}
      </div>
    </section>
  );
}
