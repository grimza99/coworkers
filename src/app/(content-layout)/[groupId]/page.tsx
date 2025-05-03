import TaskListItem from '@/app/(content-layout)/[groupId]/_[groupId]/taskListItem';

export default function Page() {
  return (
    <div>
      Page
      <div className="flex flex-col gap-4">
        <TaskListItem />
      </div>
    </div>
  );
}
