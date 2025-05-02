import axiosClient from '@/lib/axiosClient';
import { Task } from '../types/task-list-page-type';

export function taskHandlers(task: Task) {
  const handleClickPopUpDetail = (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsOpen((prev) => !prev);
  };

  const handleClickTaskEdit = () => {
    console.log('수정하기');
  };

  const handleClickTaskDelete = () => {
    console.log('삭제하기');
  };

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

  return {
    handleClickPopUpDetail,
    handleClickTaskEdit,
    handleClickTaskDelete,
    handleClickTaskStatusChange,
    handleClickToggleDailyMode,
  };
}
