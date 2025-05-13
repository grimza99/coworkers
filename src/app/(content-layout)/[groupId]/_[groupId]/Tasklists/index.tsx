'use client';
import CreateTaskListModal from '@/app/(content-layout)/[groupId]/tasklist/_tasklist/components/ModalContents/CreateTaskListModal';
import TasklistItem from '@/app/(content-layout)/[groupId]/_[groupId]/Tasklists/TasklistItem';
import { Group } from '@/types/group';
import { Tasklist } from '@/types/tasklist';
import { useOptimistic, useState, useTransition } from 'react';
import { addTasklistAction } from './actions';
import TasklistAdditionModal from './TasklistAdditionModal';

type TasklistsProps = {
  groupId: Group['id'];
  tasklists: Tasklist[];
};

export default function Tasklists({ groupId, tasklists }: TasklistsProps) {
  const [optimisticTasklists, setOptimisticTasklists] = useOptimistic(
    tasklists,
    (
      currentTasklists: Tasklist[],
      action:
        | { type: 'add'; newTasklist: Tasklist }
        | { type: 'delete'; tasklistId: Tasklist['id'] }
        | { type: 'rollback' }
    ) => {
      if (action.type === 'add') {
        return [...currentTasklists, action.newTasklist];
      } else if (action.type === 'delete') {
        return currentTasklists.filter((tasklist) => tasklist.id !== action.tasklistId);
      } else if (action.type === 'rollback') {
        return currentTasklists;
      }
      return currentTasklists;
    }
  );
  const [isAdding, startAddingTransition] = useTransition();
  const [additionError, setAdditionError] = useState<{ message: string; id: string } | null>(null);

  const addTasklist = async (name: string) => {
    startAddingTransition(async () => {
      const newTasklist = {
        id: -1,
        name: name,
        createdAt: '',
        updatedAt: '',
        groupId: groupId,
        displayIndex: tasklists[tasklists.length - 1].displayIndex + 1,
        tasks: [],
      };
      setAdditionError(null);
      setOptimisticTasklists({ type: 'add', newTasklist });

      const result = await addTasklistAction(groupId, name);

      if (!result.success) {
        setOptimisticTasklists({ type: 'rollback' });
        setAdditionError({
          message: result.message,
          id: Date.now().toString(),
        });
      }
    });
  };

  const totalTasklistCount = optimisticTasklists.length;

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg-md">
          할 일 목록 <span className="text-lg-rg text-gray500">({totalTasklistCount}개)</span>
        </h2>
        <TasklistAdditionModal addTasklist={addTasklist} />
      </div>
      <ol className="flex flex-col gap-4">
        {tasklists.map((tasklist) => (
          <TasklistItem key={tasklist.id} tasklist={tasklist} />
        ))}
      </ol>
    </section>
  );
}
