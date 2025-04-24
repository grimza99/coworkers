import DailyTask from './_myhistory/DailyTask';

export default function Home() {
  return (
    <div className="flex flex-col gap-6 md:gap-[27px]">
      <h3 className="text-xl-bold">마이 히스토리</h3>
      <div className="flex flex-col gap-10">
        <DailyTask date="2025-04-23T10:59:09.567Z" />
        <DailyTask date="2025-04-23T10:59:09.567Z" />
      </div>
    </div>
  );
}
