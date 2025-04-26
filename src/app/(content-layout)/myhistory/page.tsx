import DailyTaskList from './_myhistory/components/DailyTaskList';
import { HISTORY_MOCK_DATA } from './_myhistory/myhistory-mock-data';

export default function Home() {
  const data = HISTORY_MOCK_DATA; // 마이 히스토리 페이지에 필요한 데이터 불러오는 api 함수
  // const data = ''; // 마이 히스토리 페이지에 필요한 데이터 불러오는 api 함수

  return (
    <div className="flex h-svh flex-col gap-6 md:gap-[27px]">
      <h3 className="text-xl-bold">마이 히스토리</h3>
      {!data ? (
        <div className="flex h-svh w-full items-center justify-center">
          <p className="text-md-md text-gray-500">아직 히스토리가 없습니다.</p>
        </div>
      ) : (
        <DailyTaskList historyTaskData={data} />
      )}
    </div>
  );
}
