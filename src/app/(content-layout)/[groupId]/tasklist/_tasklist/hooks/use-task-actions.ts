import axiosClient from '@/lib/axiosClient';
import { Task } from '../types/task-type';

export function useTaskActions(task?: Task) {
  const editTask = () => {
    //수정 리퀘스트
  };

  const deleteTask = async (groupId: string, taskListId: number, taskId: number) => {
    await axiosClient.delete(`/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`);
  };

  const taskStatusChange = async (
    groupId: string,
    taskListId: number,
    isDone: boolean,
    setIsDone: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!task) return;
    await axiosClient.patch(`/groups/${groupId}/task-lists/${taskListId}/tasks/${task.id}`, {
      name: task.name,
      description: task.description,
      done: !isDone,
    });
    setIsDone((prev) => !prev);
  };

  return {
    deleteTask,
    editTask,
    taskStatusChange,
  };
}
