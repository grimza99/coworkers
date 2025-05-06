import { Tasklist } from '@/types/tasklist';
import CreateTaskListModal from '../../tasklist/_tasklist/components/ModalContents/CreateTaskListModal';
import TasklistItem from './TasklistItem';

type TasklistsProps = {
  groupId: number | `${number}`;
  tasklists: Tasklist[];
};

export default function Tasklists({ groupId, tasklists }: TasklistsProps) {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-lg-md">
          할 일 목록 <span className="text-lg-rg text-gray500">({1}개)</span>
        </h2>
        <CreateTaskListModal groupId={`${groupId}`} />
      </div>
      <ol className="flex flex-col gap-4">
        {tasklists.map((tasklist) => (
          <TasklistItem key={tasklist.id} tasklist={tasklist} />
        ))}
      </ol>
    </section>
  );
}
