import axiosClient from '@/lib/axiosClient';
import { Task } from '../types/task-list-page-type';
import useModalContext from '@/components/common/modal/core/useModalContext';

export function useTaskHandlers(task?: Task) {
  const { openModal } = useModalContext();

  const handleClickPopUpDetail = (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsOpen((prev) => !prev);
  };

  const popUpEditTaskModal = () => {
    console.log('수정하기 팝업 모달');
  };

  const handleClickTaskPopUpDeleteModal = (modalId: string) => {
    openModal(modalId);
  };

  const handleSubmitEditTask = () => {
    //수정 리퀘스트
  };

  const handleSubmitDeleteTask = async (groupId: string, taskListId: number, taskId: number) => {
    await axiosClient.delete(`/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`);
  };

  const handleClickTaskStatusChange = async (
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

  const handleClickToggleDailyMode = () => {
    console.log('데일리모드로 전환');
  };

  const handlers = {
    handleClickPopUpDetail,
    handleSubmitDeleteTask,
    popUpEditTaskModal,
    handleSubmitEditTask,
    handleClickTaskPopUpDeleteModal,
    handleClickTaskStatusChange,
    handleClickToggleDailyMode,
  };

  return handlers;
}
