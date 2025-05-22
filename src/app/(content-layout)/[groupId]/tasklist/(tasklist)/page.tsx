import { getTaskLists, getTasks } from '../_tasklist/actions/task-actions';
import ManageTaskItemModal from '../_tasklist/components/manage-task-item-modal/MangeTaskItemModal';
import DateSwitcher from '../_tasklist/components/DateSwitcher';
import TaskLists from '../_tasklist/components/TaskLists';
import Tasks from '../_tasklist/components/Tasks';

interface Props {
  params: Promise<{ groupId: string }>;

  searchParams: Promise<{ [key: string]: string }>;
}

export default async function Page({ params, searchParams }: Props) {
  const { date: searchParamsDate } = await searchParams;
  const { taskListId: searchParamsTaskListId } = await searchParams;

  const { groupId } = await params;
  const dateStr = searchParamsDate
    ? String(searchParamsDate)
    : new Date().toISOString().substring(0, 10);
  const date = new Date(dateStr);

  const taskLists = await getTaskLists(groupId);
  if (!taskLists) throw Error;

  const taskListId = searchParamsTaskListId ? Number(searchParamsTaskListId) : taskLists[0].id;

  const tasks = await getTasks(groupId, taskListId, String(date));

  return (
    <div className="flex w-full flex-col gap-6 pb-25">
      <p className="text-lg-bold md:text-xl-bold">할 일</p>
      <DateSwitcher groupId={groupId} date={String(date)} />
      <TaskLists taskLists={taskLists} currentTaskListId={searchParamsTaskListId} />
      <Tasks groupId={groupId} tasks={tasks} currentTaskList={taskLists[0]} />
      <ManageTaskItemModal groupId={Number(groupId)} taskListId={taskListId} />
    </div>
  );
}
