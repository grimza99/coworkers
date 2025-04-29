import GroupedByDateTaskList from './_myhistory/components/GroupedByDateTaskList';
import axiosServer from '@/lib/axiosServer';
import { HistoryApiResponse } from './_myhistory/types/myhistory-page-type';

export default async function MyHistoryPage() {
  async function fetchHistory() {
    try {
      const { data } = await axiosServer.get<HistoryApiResponse>('/user/history');
      return (
        <>
          {data.tasksDone.length > 0 ? (
            <GroupedByDateTaskList historyTaskData={data.tasksDone} />
          ) : (
            <div className="flex h-svh w-full items-center justify-center">
              <p className="text-md-md text-gray-500">아직 히스토리가 없습니다.</p>
            </div>
          )}
        </>
      );
    } catch {
      return (
        <div className="flex h-svh w-full items-center justify-center">
          <p className="text-md-md text-gray-500">데이터를 불러오는데 실패했습니다.</p>
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col gap-6 md:gap-[27px]">
      <h3 className="text-xl-bold">마이 히스토리</h3>
      {fetchHistory()}
    </div>
  );
}
