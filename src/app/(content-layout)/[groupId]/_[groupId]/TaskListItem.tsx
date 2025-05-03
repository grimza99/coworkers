import TaskListItemDropdown from './TaskListItemDropdown';
import TaskListProgressBadge from './TaskListProgressBadge';

export default function TaskListItem() {
  const { name, totalTasks, doneTasks } = { name: '법인 설립', totalTasks: 5, doneTasks: 3 };
  return (
    <div className="bg-bg200 flex h-10 items-center justify-between rounded-xl">
      <div className="flex h-full items-center gap-3">
        <div className="bg-purple h-full w-3 rounded-l-xl"></div>
        <div className="text-md-md">{name}</div>
      </div>
      <div className="mr-2 flex items-center gap-1">
        <TaskListProgressBadge total={totalTasks} done={doneTasks} />
        <TaskListItemDropdown />
      </div>
    </div>
  );
}
