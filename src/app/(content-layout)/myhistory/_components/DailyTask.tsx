import { formatToKoreanDate } from '@/utils/format-to-korean-date.ts';

export interface TaskDone {
  displayIndex: number;
  writerId: number;
  userId: number;
  deletedAt: string;
  frequency: string;
  description: string;
  name: string;
  recurringId: number;
  doneAt: string;
  date: string;
  updatedAt: string;
  id: number;
}

const mockData = [
  'description',
  'description',
  'description',
  'description',
  'description',
  'description',
  'description',
  'description',
];

/**ToDo : div 태그 리스트아이템 컴포넌트로 바꾸기  */
interface Props {
  date: string;
  // doneTasks: TaskDone;
}

export default function DailyTask({ date }: Props) {
  const formattedDate = formatToKoreanDate(date);

  // const { description } = doneTasks;

  return (
    <div className="text-lg-md flex flex-col gap-4">
      <p>{formattedDate}</p>
      {mockData.map((task, idx) => {
        return <div key={idx}>{task}</div>;
      })}
    </div>
  );
}
