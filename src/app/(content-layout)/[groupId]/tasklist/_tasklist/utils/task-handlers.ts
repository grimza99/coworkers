import axiosClient from '@/lib/axiosClient';
import { Task } from '../types/task-list-page-type';
import useModalContext from '@/components/common/modal/core/useModalContext';

export function taskHandlers(task: Task) {
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

  const handleSubmitDeleteTask = async () => {};
  const handleClickTaskStatusChange = async (
    groupId: string,
    taskListId: number,
    isDone: boolean,
    setIsDone: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      await axiosClient.patch(`/groups/${groupId}/task-lists/${taskListId}/tasks/${task.id}`, {
        name: task.name,
        description: task.description,
        done: !isDone,
      });
      setIsDone((prev) => !prev);
    } catch {
      //에러 핸들링
    }
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
