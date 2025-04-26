import TaskListItem from '@/components/task-list-item/TaskListItem';
import { format } from 'date-fns';
import { TaskDoneProp } from '../types/myhistory-page-type';

/**ToDo : div 태그 리스트아이템 컴포넌트로 바꾸기  */
interface Props {
  date: string;
  data: TaskDoneProp[];
  // doneTasks: TaskDone;
}

export default function DailyTask({ date, data }: Props) {
  return (
    <div className="text-lg-md flex flex-col gap-4">
      <p>{format(date, 'yyyy년 MM월 dd일')}</p>
      {data.map((task) => {
        return <TaskListItem key={task.id} type="history" isDone description={task.description} />;
      })}
    </div>
  );
}
