import axiosClient from '@/lib/axiosClient';
import { Task } from '../types/task-type';
import { Toast } from '@/components/common/Toastify';
import { revalidateDetailTask } from '../actions/task-actions';

export function useTaskActions(task?: Task) {
  const deleteTask = async (
    groupId: string,
    taskListId: number,
    taskId: number,
    setTaskToDeleteState: () => void
  ) => {
    try {
      const res = await axiosClient.delete(
        `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`
      );
      if (res.status === 204) {
        setTaskToDeleteState();
        Toast.success('할 일 삭제 성공');
      }
    } catch {
      Toast.error('할 일 삭제 실패');
    }
  };

  const toggleTaskDone = async (doneState: boolean, toggleDoneState?: () => void) => {
    if (!task) return;
    try {
      await axiosClient.patch(`/groups/groupId/task-lists/taskListId/tasks/${task.id}`, {
        name: task.name,
        description: task.description,
        done: !doneState,
      });
      toggleDoneState?.();
      revalidateDetailTask();
      if (doneState) return Toast.success('할 일 완료 취소 성공');
      if (!doneState) return Toast.success('할 일 완료 성공');
    } catch {
      if (doneState) return Toast.error('할 일 완료 취소 실패');
      if (!doneState) return Toast.error('할 일 완료 실패');
    }
  };

  const saveNewTaskOrder = async (taskListId: number, id: number, index: number) => {
    try {
      await axiosClient.patch(`/groups/{groupId}/task-lists/${taskListId}/tasks/${id}/order`, {
        displayIndex: index,
      });
      Toast.success('할일 순서 변경 성공');
    } catch {
      Toast.error('할일 순서 변경 실패');
    }
  };
  return {
    deleteTask,
    toggleTaskDone,
    saveNewTaskOrder,
  };
}
