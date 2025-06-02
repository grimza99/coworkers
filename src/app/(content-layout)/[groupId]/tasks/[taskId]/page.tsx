import { ErrorBoundary } from 'react-error-boundary';
import DetailTaskCommentField from '../../tasklist/@detailTask/_components/DetailTaskCommentsField';
import DetailTaskContentField from '../../tasklist/@detailTask/_components/DetailTaskContentField';
import ToggleDoneButton from '../../tasklist/@detailTask/_components/ToggleDoneButton';
import { getDetailTask } from '../../tasklist/_tasklist/actions/task-actions';
import { DetailTaskType } from '../../tasklist/_tasklist/types/task-type';

interface Props {
  params: Promise<{ taskId: string }>;
}
export default async function DetailTaskPage({ params }: Props) {
  const taskId = (await params).taskId;

  const task: DetailTaskType = await getDetailTask(taskId);

  const isDone = Boolean(task.doneAt);

  return (
    <ErrorBoundary fallback={<div>해당 태스크를 불러올 수 없습니다.</div>}>
      <div className="flex h-full w-full flex-col gap-25 overflow-scroll">
        <DetailTaskContentField isDone={isDone} task={task} />
        <DetailTaskCommentField taskId={task.id} />
        <ToggleDoneButton isDone={isDone} task={task} />
      </div>
    </ErrorBoundary>
  );
}
