export default function Loading() {
  return (
    <main className="animate-pulse">
      <div className="border-gray100/10 bg-gray100/10 relative flex h-16 w-full items-center justify-between rounded-xl border-1 px-6 py-5">
        <div className="bg-gray200/10 h-4 w-32 rounded"></div>
        <div className="bg-gray200/10 h-6 w-6 rounded-lg"></div>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div className="bg-gray200/10 h-4 w-32 rounded"></div>
            <div className="bg-gray200/10 h-4 w-32 rounded"></div>
          </div>
          <ol className="flex flex-col gap-4">
            <li className="bg-bg200 flex h-10 items-center justify-between rounded-xl">
              <div className="bg-gray200/10 h-4 w-32 rounded"></div>
            </li>
            <li className="bg-bg200 flex h-10 items-center justify-between rounded-xl">
              <div className="bg-gray200/10 h-4 w-32 rounded"></div>
            </li>
          </ol>
        </section>
        <section className="flex w-full flex-col gap-4">
          <div className="bg-gray200/10 h-4 w-32 rounded"></div>
          <div className="bg-bg200 h-56 rounded-xl px-6 py-6 lg:h-[217px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-10">
                <div className="bg-bg300 size-40 rounded-full"></div>
                <div className="flex flex-col gap-2">
                  <div className="bg-bg300 h-8 w-13 rounded-full"></div>
                  <div className="bg-bg300 h-12 w-22 rounded-full"></div>
                </div>
              </div>
              <div className="flex h-full w-full max-w-100 flex-col gap-4">
                <div className="bg-bg100 flex h-20 max-h-100 w-full items-center justify-between rounded-xl px-4 py-4"></div>
                <div className="bg-bg100 flex h-20 max-h-100 w-full items-center justify-between rounded-xl px-4 py-4"></div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="mb-4 flex items-center justify-between">
            <div className="bg-gray200/10 h-4 w-32 rounded"></div>
            <div className="bg-gray200/10 h-4 w-32 rounded"></div>
          </div>
          <ul className="grid grid-cols-2 gap-6 md:grid-cols-3">
            <li className="bg-bg200 flex items-center justify-between gap-1.5 rounded-2xl px-4 py-3 md:px-6 md:py-5"></li>
            <li className="bg-bg200 flex items-center justify-between gap-1.5 rounded-2xl px-4 py-3 md:px-6 md:py-5"></li>
            <li className="bg-bg200 flex items-center justify-between gap-1.5 rounded-2xl px-4 py-3 md:px-6 md:py-5"></li>
          </ul>
        </section>
      </div>
    </main>
  );
}
