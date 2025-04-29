import GroupedByDateTaskList from './_myhistory/components/GroupedByDateTaskList';
import axiosServer from '@/lib/axiosServer';
import { MyHistoryItem } from './_myhistory/types/myhistory-page-type';

export default async function MyHistoryPage() {
  const res = await axiosServer.get(`/user/history`);
  const data: MyHistoryItem[] = res.data.tasksDone;
  console.log(data);

  return (
    <div className="flex flex-col gap-6 md:gap-[27px]">
      <h3 className="text-xl-bold">마이 히스토리</h3>
      {data.length > 0 ? (
        <GroupedByDateTaskList historyTaskData={data} />
      ) : (
        <div className="flex h-svh w-full items-center justify-center">
          <p className="text-md-md text-gray-500">아직 히스토리가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
