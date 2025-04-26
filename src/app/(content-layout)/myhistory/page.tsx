import DailyTaskList from './_myhistory/components/DailyTaskList';
import { HISTORY_MOCK_DATA } from './_myhistory/myhistory-mock-data';

export default function Home() {
  const data = HISTORY_MOCK_DATA; // 마이 히스토리 페이지에 필요한 데이터 불러오는 api 함수

  return (
    <div className="flex flex-col gap-6 md:gap-[27px]">
      <h3 className="text-xl-bold">마이 히스토리</h3>
      {!data ? <div>아직 히스토리가 없습니다.</div> : <DailyTaskList historyTaskData={data} />}
    </div>
  );
}
