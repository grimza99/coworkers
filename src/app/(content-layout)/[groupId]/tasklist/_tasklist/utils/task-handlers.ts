import axiosClient from '@/lib/axiosClient';
import { Task } from '../types/task-list-page-type';

export function taskHandlers(task: Task) {
  const handleClickPopUpDetail = () => {
    console.log('디테일');
    // 팝업 로직
  };

  const handleClickItemEdit = () => {
    console.log('수정하기');
  };

  const handleClickItemDelete = () => {
    console.log('삭제하기');
  };

  const handleClickItemStatusChange = async (
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
    handleClickItemEdit,
    handleClickItemDelete,
    handleClickItemStatusChange,
    handleClickToggleDailyMode,
  };
}
