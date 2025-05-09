import Tasklists from '@/app/(content-layout)/[groupId]/_[groupId]/Tasklists/Loading';
import Report from '@/app/(content-layout)/[groupId]/_[groupId]/Report/Loading';
import Members from '@/app/(content-layout)/[groupId]/_[groupId]/Members/Loading';

export default function Loading() {
  return (
    <main className="animate-pulse">
      <div className="bg-bg200 flex h-16 items-center justify-between rounded-xl px-6">
        <div className="bg-gray200/10 h-6 w-32 rounded-lg"></div>
        <div className="bg-gray200/10 h-6 w-6 rounded-lg"></div>
      </div>
      <div className="mt-6 mb-50 flex flex-col gap-12 lg:gap-16">
        <Tasklists />
        <Report />
        <Members />
      </div>
    </main>
  );
}
