import Image from 'next/image';
import gearIcon from '@/../public/icons/gear-icon.svg';
import groupThumbnailImage from '@/../public/images/group-thumbnail.png';
import axiosServer from '@/lib/axiosServer';
import Tasklists from './_[groupId]/Tasklists';
import Report from './_[groupId]/Report';
import Members from './_[groupId]/Members';

export default async function Page({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = await params;
  const res = await axiosServer.get(`/groups/${groupId}`);
  const data = res.data;
  return (
    <main>
      <div className="border-gray100/10 bg-gray100/10 relative flex h-16 w-full items-center justify-between rounded-xl border-1 px-6 py-5">
        <h1 className="text-xl-bold text-white">{data.name}</h1>
        <Image
          src={groupThumbnailImage}
          width={543}
          height={192}
          alt="그룹 기본 이미지"
          className="absolute right-1/4 h-16 w-auto object-contain md:right-20"
        />
        <Image src={gearIcon} width={24} height={24} alt="톱니바퀴" className="size-6" />
      </div>
      <div className="mt-6 mb-50 flex flex-col gap-12 lg:gap-16">
        <Tasklists groupId={data.groupId} tasklists={data.taskLists} />
        <Report tasklists={data.taskLists} />
        <Members groupId={data.groupId} members={data.members} />
      </div>
    </main>
  );
}
