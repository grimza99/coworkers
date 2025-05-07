import axiosClient from '@/lib/axiosClient';
import { Task } from '../types/task-type';

export function useTaskActions(task?: Task) {
  const editTask = () => {
    //수정 리퀘스트
  };

  const deleteTask = async (
    groupId: string,
    taskListId: number,
    taskId: number,
    setIsDelete: () => void
  ) => {
    await axiosClient.delete(`/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`);
    setIsDelete();
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
