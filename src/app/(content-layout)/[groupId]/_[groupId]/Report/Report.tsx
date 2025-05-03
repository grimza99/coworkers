import { Task } from '../../tasklist/_tasklist/types/task-list-page-type';
import TaskCount from './TaskCount';

interface Props {
  tasks: Task[];
}

export default function Report({ tasks }: Props) {
  // if (!(tasks.length > 0)) return;
  const taskCount = tasks.length;

  return (
    <div className="flex w-full flex-col px-6 py-6">
      <p className="text-lg-md">리포트</p>
      <div className="bg-bg200 h-56 rounded-xl lg:h-[217px]">
        <div>
          <div>프로그레스</div>
          <div className="flex h-full w-full max-w-100 flex-col gap-4">
            <TaskCount variant="total" count={20} />
            <TaskCount variant="done" count={5} />
          </div>
        </div>
      </div>
    </div>
  );
}
