import TaskListItem from '@/components/task-list-item/TaskListItem';
import { format } from 'date-fns';
import { GroupedByDateTask } from '../types/myhistory-page-type';

interface Props {
  date: string;
  tasks: GroupedByDateTask[];
}

export default function GroupedByDateTaskItem({ date, tasks }: Props) {
  return (
    <div className="text-lg-md flex flex-col gap-4">
      <p>{format(date, 'yyyy년 MM월 dd일')}</p>
      {tasks.map((task) => {
        return <TaskListItem key={task.id} type="history" isDone name={task.name} />;
      })}
    </div>
  );
}
