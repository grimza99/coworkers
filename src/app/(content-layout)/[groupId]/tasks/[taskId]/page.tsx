'use client';

import DetailTask from '../../tasklist/@detailTask/_components/DetailTask';

interface Props {
  isDone: boolean;
  setIsDone: () => void;
  taskId: number;
}
export default function DetailTaskPage({ taskId, ...props }: Props) {
  return <DetailTask taskId={taskId} {...props} />;
}
