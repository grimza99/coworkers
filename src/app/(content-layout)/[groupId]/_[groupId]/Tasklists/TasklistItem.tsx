import TasklistProgressBadge from './TasklistProgressBadge';
import TasklistItemDropdown from './TasklistItemDropdown';
import { Tasklist } from '@/types/tasklist';

type TasklistItemProps = {
  tasklist: Tasklist;
};

export default function TasklistItem({ tasklist }: TasklistItemProps) {
  const { name } = tasklist;
  const totalTasks = 3;
  const doneTasks = 1;

  return (
    <li className="bg-bg200 flex h-10 items-center justify-between rounded-xl">
      <div className="flex h-full items-center gap-3">
        <div className="bg-purple h-full w-3 rounded-l-xl"></div>
        <div className="text-md-md">{name}</div>
      </div>
      <div className="mr-2 flex items-center gap-1">
        <TasklistProgressBadge total={totalTasks} done={doneTasks} />
        <TasklistItemDropdown />
      </div>
    </li>
  );
}
