export default function ArticlesPageLoading() {
  return (
    <main className="animate-pulse space-y-10 pb-20">
      <section className="space-y-4">
        <div className="bg-gray200/10 h-8 w-40 rounded" />
        <div className="bg-bg200 h-10 w-full rounded" />
      </section>

      <section className="border-bg200 space-y-6 border-b pb-10">
        <div className="bg-gray200/10 h-7 w-32 rounded" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-bg200 h-44 rounded" />
          <div className="bg-bg200 h-44 rounded" />
          <div className="bg-bg200 h-44 rounded" />
        </div>
      </section>

      <section className="space-y-6 pt-10">
        <div className="flex justify-between">
          <div className="bg-gray200/10 h-7 w-20 rounded" />
          <div className="flex gap-4">
            <div className="bg-gray200/10 h-8 w-24 rounded" />
            <div className="bg-gray200/10 h-8 w-24 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-bg200 h-36 rounded" />
          ))}
        </div>
        <div className="bg-gray200/10 mx-auto h-10 w-60 rounded" />
      </section>

      <div className="bg-gray200/10 fixed right-6 bottom-6 h-12 w-24 rounded-full" />
    </main>
  );
}
