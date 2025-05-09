export default function Loading() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div className="bg-gray200/10 h-4 w-20 rounded"></div>
        <div className="bg-gray200/10 h-4 w-32 rounded"></div>
      </div>
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-3">
        <li className="bg-bg200 h-[73px] items-center justify-between rounded-2xl"></li>
        <li className="bg-bg200 h-[73px] items-center justify-between rounded-2xl"></li>
        <li className="bg-bg200 h-[73px] items-center justify-between rounded-2xl"></li>
      </ul>
    </section>
  );
}
