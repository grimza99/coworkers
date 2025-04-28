import GroupedByDateTaskList from './_myhistory/components/GroupedByDateTaskList';
import { HISTORY_MOCK_DATA } from './_myhistory/myhistory-mock-data';

export default function MyHistoryPage() {
  const data = HISTORY_MOCK_DATA; // 마이 히스토리 페이지에 필요한 데이터 불러와서 담을 변수
  // const data = ''; //data가 없을 경우
  if (!data)
    return (
      <div className="flex h-svh w-full items-center justify-center">
        <p className="text-md-md text-gray-500">아직 히스토리가 없습니다.</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-6 md:gap-[27px]">
      <h3 className="text-xl-bold">마이 히스토리</h3>
      <GroupedByDateTaskList historyTaskData={data} />
    </div>
  );
}
