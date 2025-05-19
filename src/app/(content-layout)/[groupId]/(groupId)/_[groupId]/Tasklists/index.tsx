'use client';
import { useState, useOptimistic, useTransition } from 'react';
import TasklistItem from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Tasklists/TasklistItem';
import TasklistCreateModal from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Tasklists/TasklistCreateModal';
import { createTasklistAction } from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Tasklists/actions';
import { Group } from '@/types/group';
import { Tasklist } from '@/types/tasklist';
import { ModalTrigger } from '@/components/common/modal';

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
        | { type: 'create'; newTasklist: Tasklist }
        | { type: 'delete'; tasklistId: Tasklist['id'] }
        | { type: 'rollback' }
    ) => {
      if (action.type === 'create') {
        return [...currentTasklists, action.newTasklist];
      } else if (action.type === 'delete') {
        return currentTasklists.filter((tasklist) => tasklist.id !== action.tasklistId);
      } else if (action.type === 'rollback') {
        return currentTasklists;
      }
      return currentTasklists;
    }
  );
  const [isCreationLoading, startCreatingTransition] = useTransition();
  const [transitionError, setTransitionError] = useState<{ message: string; id: string } | null>(
    null
  );

  const createTasklist = async (name: string) => {
    startCreatingTransition(async () => {
      const newTasklist = {
        id: -1,
        name: name,
        createdAt: '',
        updatedAt: '',
        groupId: groupId,
        displayIndex: tasklists[tasklists.length - 1].displayIndex + 1,
        tasks: [],
      };
      setTransitionError(null);
      setOptimisticTasklists({ type: 'create', newTasklist });

      const result = await createTasklistAction(groupId, name);

      if (!result.success) {
        setOptimisticTasklists({ type: 'rollback' });
        setTransitionError({
          message: result.message,
          id: Date.now().toString(),
        });
      }
    });
  };

  const tasklistCreateModalId = `tasklistCreate-${groupId}`;
  const totalTasklistCount = optimisticTasklists.length;

  return (
    <>
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg-md">
            할 일 목록 <span className="text-lg-rg text-gray500">({totalTasklistCount}개)</span>
          </h2>
          <ModalTrigger className="text-primary w-fit" modalId={tasklistCreateModalId}>
            + 새로운 목록 추가하기
          </ModalTrigger>
        </div>
        <ol className="flex flex-col gap-4">
          {tasklists.map((tasklist) => (
            <TasklistItem key={tasklist.id} tasklist={tasklist} />
          ))}
        </ol>
      </section>

      <TasklistCreateModal
        modalId={tasklistCreateModalId}
        createTasklist={createTasklist}
        isCreationLoading={isCreationLoading}
        errorOnCreate={transitionError}
      />
    </>
  );
}
