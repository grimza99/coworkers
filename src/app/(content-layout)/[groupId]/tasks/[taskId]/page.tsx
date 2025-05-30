import DetailTaskCommentField from '../../tasklist/@detailTask/_components/DetailTaskCommentsField';
import Content from '../../tasklist/@detailTask/_components/DetailTaskContentField';
import axiosServer from '@/lib/axiosServer';
import { DetailTaskType } from '../../tasklist/_tasklist/types/task-type';
import ToggleDoneButton from '../../tasklist/@detailTask/_components/ToggleDoneButton';

interface Props {
  params: Promise<{ taskId: string }>;
}
export default async function DetailTaskPage({ params }: Props) {
  const taskId = (await params).taskId;

  const { data } = await axiosServer(`/groups/groupId/task-lists/taskListId/tasks/${taskId}`);
  const task = data;
  const isDone = Boolean(task.doneAt);

  return (
    <div className="flex h-full w-full flex-col gap-25 overflow-scroll">
      <Content isDone={isDone} task={task} />
      <DetailTaskCommentField taskId={task.id} />
      <ToggleDoneButton isDone={isDone} task={task} />
    </div>
  );
}
