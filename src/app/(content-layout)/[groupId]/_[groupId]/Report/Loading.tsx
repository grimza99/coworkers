export default function Loading() {
  return (
    <section className="flex flex-col gap-4">
      <div className="bg-gray200/10 h-4 w-16 rounded"></div>
      <div className="bg-bg200 h-56 rounded-xl px-6 py-6 lg:h-[217px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="bg-gray200/10 size-40 rounded-full"></div>
            <div className="flex flex-col gap-2">
              <div className="bg-gray200/10 h-8 w-13 rounded-lg"></div>
              <div className="bg-gray200/10 h-12 w-22 rounded-lg"></div>
            </div>
          </div>
          <div className="flex h-full w-full max-w-100 flex-col gap-4">
            <div className="bg-gray200/10 flex h-20 w-full items-center justify-between rounded-lg"></div>
            <div className="bg-gray200/10 flex h-20 w-full items-center justify-between rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
