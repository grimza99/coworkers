import DateSwitcher from '../_tasklist/components/Test/DateSwitcher';
import TaskLists from '../_tasklist/components/Test/TaskLists';
import Tasks from '../_tasklist/components/Test/Tasks';
import { getTaskLists, getTasks } from '../_tasklist/actions/task-actions';
import ManageTaskItemModal from '../_tasklist/components/manage-task-item-modal/MangeTaskItemModal';
import { ErrorBoundary } from 'react-error-boundary';
import TaskListPageFallBack from '../error';

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
      {/* <div className="flex justify-between">
        <div className="relative flex items-center gap-3">
          <p className="text-lg-md">{format(currentDate, 'M월 dd일 (eee)', { locale: ko })}</p>
          <div className="flex gap-1">
            <button onClick={() => handleClickChangeDayIcon('prev')}>
              <Image src={prevIcon} width={16} height={16} alt="<" />
            </button>
            <button onClick={() => handleClickChangeDayIcon('next')}>
              <Image src={nextIcon} width={16} height={16} alt=">" />
            </button>
          </div>
          <button onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
            <Image src={calendar} width={24} height={24} alt=">" />
          </button>
          {isCalendarOpen && (
            <div ref={ref} className="absolute top-10 z-100 w-80 md:top-0 md:-right-90 md:w-100">
              <CalendarSelect
                date={currentDate}
                onDateChange={(value) => {
                  setCurrentDate(value);
                  setIsCalendarOpen(false);
                }}
              />
            </div>
          )}
        </div>
        <CreateTaskListModal groupId={groupId} />
      </div> */}
      {/* <ErrorBoundary fallbackRender={({ error }) => <TaskListPageFallBack error={error} />}>
        <DateWiseTaskList
          groupId={groupId}
          date={currentDate}
          updateTaskListId={updateTaskListId}
        />
        <ManageTaskItemModal groupId={Number(groupId)} taskListId={taskListId} />
      </ErrorBoundary> */}
      <DateSwitcher groupId={groupId} date={String(date)} />
      <TaskLists taskLists={taskLists} date={String(date)} />
      <Tasks groupId={groupId} tasks={tasks} currentTaskList={taskLists[0]} />
      <ManageTaskItemModal groupId={Number(groupId)} taskListId={taskListId} />
    </div>
  );
}
