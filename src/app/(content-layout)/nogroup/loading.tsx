export default function Loading() {
  return (
    <main className="flex h-[calc(100vh-92px)] animate-pulse flex-col items-center justify-center gap-12 md:gap-20">
      <div>
        <div className="bg-bg200 mb-8 h-[98px] w-[312px] rounded-xl md:mb-12 md:h-[163px] md:w-[520px] lg:h-[254px] lg:w-[810px]"></div>
        <div className="flex flex-col items-center gap-2">
          <div className="bg-gray200/10 h-4 w-28 rounded"></div>
          <div className="bg-gray200/10 h-4 w-28 rounded"></div>
        </div>
      </div>
      <div className="flex w-[186px] flex-col gap-2">
        <div className="bg-bg200 h-10 w-full rounded-xl"></div>
        <div className="bg-bg200 h-10 w-full rounded-xl"></div>
      </div>
    </main>
  );
}
