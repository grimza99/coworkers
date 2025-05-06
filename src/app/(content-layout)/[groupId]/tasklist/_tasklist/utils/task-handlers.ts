import axiosClient from '@/lib/axiosClient';
import { Task } from '../types/task-type';
import useModalContext from '@/components/common/modal/core/useModalContext';

export function useTaskHandlers(task?: Task) {
  const { openModal } = useModalContext();

  const PopUpDetailTask = (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsOpen((prev) => !prev);
  };

  const popUpEditTaskModal = (modalId: string) => {
    openModal(modalId);
  };

  const popUpDeleteTaskModal = (modalId: string) => {
    openModal(modalId);
  };

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

  const toggleDailyMode = () => {
    console.log('데일리모드로 전환');
  };

  const handlers = {
    PopUpDetailTask,
    deleteTask,
    popUpEditTaskModal,
    editTask,
    popUpDeleteTaskModal,
    taskStatusChange,
    toggleDailyMode,
  };

  return handlers;
}
