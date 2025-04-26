'use client';

import { TaskDoneProp } from '../types/myhistory-page-type';
import DailyTask from './DailyTask';

interface Props {
  historyTaskData: TaskDoneProp[];
}

export default function DailyTaskList({ historyTaskData }: Props) {
  const groupedByDateArray = Object.entries(
    historyTaskData.reduce(
      (acc, item) => {
        if (!acc[item.date]) {
          acc[item.date] = [];
        }
        acc[item.date].push(item);
        return acc;
      },
      {} as Record<string, TaskDoneProp[]>
    )
  ).map(([date, tasks]) => ({
    date,
    tasks,
  }));

  console.log(groupedByDateArray);

  return (
    <>
      <div className="flex flex-col gap-10">
        {groupedByDateArray.map((date, idx) => {
          return <DailyTask key={idx} date={date.date} data={date.tasks} />;
        })}
      </div>
    </>
  );
}
