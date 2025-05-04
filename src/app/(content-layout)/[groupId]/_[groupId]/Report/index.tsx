import ReportProgress from './GroupProgress';
import TaskCount from './TaskCount';

interface Props {
  taskCount: number;
  done: number;
}

export default function Report({ taskCount, done }: Props) {
  const percent = (done / taskCount) * 100;

  return (
    <div className="flex w-full flex-col gap-4">
      <p className="text-lg-md">리포트</p>
      <div className="bg-bg200 h-56 rounded-xl px-6 py-6 lg:h-[217px]">
        <div className="flex justify-between">
          <ReportProgress percent={percent} />
          <div className="flex h-full w-full max-w-100 flex-col gap-4">
            <TaskCount variant="total" count={taskCount} />
            <TaskCount variant="done" count={done} />
          </div>
        </div>
      </div>
    </div>
  );
}
