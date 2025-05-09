export default function Loading() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div className="bg-gray200/10 h-4 w-28 rounded"></div>
        <div className="bg-gray200/10 h-4 w-32 rounded"></div>
      </div>
      <ol className="flex flex-col gap-4">
        <li className="bg-bg200 flex h-10 items-center justify-between rounded-xl px-4">
          <div className="bg-gray200/10 h-4 w-32 rounded"></div>
        </li>
        <li className="bg-bg200 flex h-10 items-center justify-between rounded-xl px-4">
          <div className="bg-gray200/10 h-4 w-32 rounded"></div>
        </li>
      </ol>
    </section>
  );
}
