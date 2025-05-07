import axiosClient from '@/lib/axiosClient';
import { Task } from '../types/task-type';
import useModalContext from '@/components/common/modal/core/useModalContext';
import { ERROR_MODAL_ID } from '@/constants/error-modal';

export function useTaskActions(task?: Task) {
  const { openModal } = useModalContext();

  const editTask = () => {
    //수정 리퀘스트
  };

  const deleteTask = async (
    groupId: string,
    taskListId: number,
    taskId: number,
    setIsDelete: () => void
  ) => {
    try {
      const res = await axiosClient.delete(
        `/groups/${groupId}/task-lists/${taskListId}/tass/${taskId}`
      );
      if (res.status === 204) {
        setIsDelete();
      }
    } catch {
      openModal(ERROR_MODAL_ID.DELETE_TASK);
    }
  };

  const toggleTaskDone = async (
    groupId: string,
    taskListId: number,
    doneState: boolean,
    toggleDoneState: () => void
  ) => {
    if (!task) return;
    await axiosClient.patch(`/groups/${groupId}/task-lists/${taskListId}/tasks/${task.id}`, {
      name: task.name,
      description: task.description,
      done: !doneState,
    });
    toggleDoneState();
  };

  return {
    deleteTask,
    editTask,
    toggleTaskDone,
  };
}
