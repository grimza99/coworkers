'use client';
import { useState, useOptimistic, useTransition } from 'react';
import TasklistItem from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Tasklists/TasklistItem';
import TasklistCreateModal from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Tasklists/TasklistCreateModal';
import TasklistUpdateModal from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Tasklists/TasklistUpdateModal';
import TasklistDeleteModal from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Tasklists/TasklistDeleteModal';
import {
  createTasklistAction,
  updateTasklistAction,
  deleteTasklistAction,
} from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Tasklists/actions';
import { ModalTrigger } from '@/components/common/modal';
import { Group } from '@/types/group';
import { Tasklist } from '@/types/tasklist';
import useModalContext from '@/components/common/modal/core/useModalContext';

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
        | { type: 'update'; selectedTasklist: Tasklist; newName: Tasklist['name'] }
        | { type: 'delete'; selectedTasklist: Tasklist }
        | { type: 'rollback' }
    ) => {
      if (action.type === 'create') {
        return [...currentTasklists, action.newTasklist];
      } else if (action.type === 'update') {
        return currentTasklists.map((tasklist) =>
          tasklist.id === action.selectedTasklist.id
            ? { ...tasklist, name: action.newName }
            : tasklist
        );
      } else if (action.type === 'delete') {
        return currentTasklists.filter((tasklist) => tasklist.id !== action.selectedTasklist.id);
      } else if (action.type === 'rollback') {
        return currentTasklists;
      }
      return currentTasklists;
    }
  );
  const [selectedTasklist, setSelectedTasklist] = useState<Tasklist | null>(null);
  const [isCreationLoading, startCreationTransition] = useTransition();
  const [isUpdateLoading, startUpdateTransition] = useTransition();
  const [isDeletionLoading, startDeletionTransition] = useTransition();
  const [transitionError, setTransitionError] = useState<{ message: string; id: string } | null>(
    null
  );

  const createTasklist = async (name: string) => {
    startCreationTransition(async () => {
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

  const updateTasklist = async (selectedTasklist: Tasklist, newName: string) => {
    startUpdateTransition(async () => {
      setTransitionError(null);
      setOptimisticTasklists({ type: 'update', selectedTasklist, newName });

      const result = await updateTasklistAction(groupId, selectedTasklist.id, newName);

      if (!result.success) {
        setOptimisticTasklists({ type: 'rollback' });
        setTransitionError({
          message: result.message,
          id: Date.now().toString(),
        });
      }
    });
  };

  const deleteTasklist = async (selectedTasklist: Tasklist) => {
    startDeletionTransition(async () => {
      setTransitionError(null);
      setOptimisticTasklists({ type: 'delete', selectedTasklist });

      const result = await deleteTasklistAction(groupId, selectedTasklist.id);

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
  const tasklistUpdateModalId = selectedTasklist ? `tasklistUpdate-${selectedTasklist.id}` : '';
  const tasklistDeleteModalId = selectedTasklist ? `tasklistDelete-${selectedTasklist.id}` : '';
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
            <TasklistItem
              key={tasklist.id}
              tasklist={tasklist}
              onDropdownTriggerClick={() => setSelectedTasklist(tasklist)}
            />
          ))}
        </ol>
      </section>

      <TasklistCreateModal
        modalId={tasklistCreateModalId}
        createTasklist={createTasklist}
        isCreationLoading={isCreationLoading}
        errorOnCreate={transitionError}
      />

      {selectedTasklist && (
        <TasklistUpdateModal
          tasklist={selectedTasklist}
          modalId={tasklistUpdateModalId}
          updateTasklist={updateTasklist}
          isUpdateLoading={isUpdateLoading}
          errorOnUpdate={transitionError}
        />
      )}

      {selectedTasklist && (
        <TasklistDeleteModal
          tasklist={selectedTasklist}
          modalId={tasklistDeleteModalId}
          deleteTasklist={deleteTasklist}
          isDeletionLoading={isDeletionLoading}
          errorOnDelete={transitionError}
        />
      )}
    </>
  );
}
