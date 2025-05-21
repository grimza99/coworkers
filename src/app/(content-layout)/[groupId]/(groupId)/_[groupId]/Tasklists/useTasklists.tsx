import { useState, useOptimistic, useTransition } from 'react';
import {
  createTasklistAction,
  updateTasklistAction,
  deleteTasklistAction,
} from '@/app/(content-layout)/[groupId]/(groupId)/_[groupId]/Tasklists/actions';
import { Group } from '@/types/group';
import { Tasklist } from '@/types/tasklist';

export default function useOptimisticTasklists(groupId: Group['id'], tasklists: Tasklist[]) {
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
      switch (action.type) {
        case 'create':
          return [...currentTasklists, action.newTasklist];

        case 'update':
          return currentTasklists.map((tasklist) =>
            tasklist.id === action.selectedTasklist.id
              ? { ...tasklist, name: action.newName }
              : tasklist
          );

        case 'delete':
          return currentTasklists.filter((tasklist) => tasklist.id !== action.selectedTasklist.id);

        case 'rollback':
          return currentTasklists;

        default:
          return currentTasklists;
      }
    }
  );
  const [selectedTasklist, setSelectedTasklist] = useState<Tasklist | null>(null);
  const [isCreateLoading, startCreateTransition] = useTransition();
  const [isUpdateLoading, startUpdateTransition] = useTransition();
  const [isDeleteLoading, startDeleteTransition] = useTransition();
  const [transitionError, setTransitionError] = useState<{ message: string; id: string } | null>(
    null
  );

  const createTasklist = async (name: string) => {
    startCreateTransition(async () => {
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
    startDeleteTransition(async () => {
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

  return {
    optimisticTasklists,
    selectedTasklist,
    setSelectedTasklist,
    isCreateLoading,
    isUpdateLoading,
    isDeleteLoading,
    transitionError,
    createTasklist,
    updateTasklist,
    deleteTasklist,
  };
}
