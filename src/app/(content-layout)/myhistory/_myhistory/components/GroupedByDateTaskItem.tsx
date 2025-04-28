import TaskListItem from '@/components/task-list-item/TaskListItem';
import { format } from 'date-fns';
import { TaskDoneProp } from '../types/myhistory-page-type';

interface Props {
  date: string;
  data: TaskDoneProp[];
}

export default function GroupedByDateTaskItem({ date, data }: Props) {
  return (
    <div className="text-lg-md flex flex-col gap-4">
      <p>{format(date, 'yyyy년 MM월 dd일')}</p>
      {data.map((task) => {
        return <TaskListItem key={task.id} type="history" isDone description={task.description} />;
      })}
    </div>
  );
}
