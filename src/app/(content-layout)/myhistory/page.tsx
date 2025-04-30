import GroupedByDateTaskList from './_myhistory/components/GroupedByDateTaskList';
import axiosServer from '@/lib/axiosServer';
import { HistoryTasksApiResponse } from './_myhistory/types/myhistory-page-type';

export default async function MyHistoryPage() {
  async function fetchHistoryTasks() {
    const { data } = await axiosServer.get<HistoryTasksApiResponse>('/user/history');
    // const { data } = await axiosServer.patch<HistoryTasksApiResponse>('/user/history', {
    //   headers: { 'Content-Type': 'application/json' },
    //   fetchOptions: { cache: 'force-cache' },
    // });
    return data;
  }

  async function renderHistoryTasks() {
    try {
      const historyTasks = await fetchHistoryTasks();
      return (
        <>
          {historyTasks.tasksDone.length > 0 ? (
            <GroupedByDateTaskList historyTaskData={historyTasks.tasksDone} />
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
      {renderHistoryTasks()}
    </div>
  );
}
