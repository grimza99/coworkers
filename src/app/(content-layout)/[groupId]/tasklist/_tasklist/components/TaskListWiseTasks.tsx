'use client';
import TaskListItem from '@/components/task-list-item/TaskListItem';
import { format, isValid } from 'date-fns';
import { useState } from 'react';
import { Task } from '../types/task-list-page-type';
import { TaskItemHandlers } from '../utils/task-list-item-handlers';

interface Props {
  task: Task;
}

export default function TaskListWiseTasks({ task }: Props) {
  const [isDone, setIsDone] = useState(Boolean(task.doneAt));

  const {
    handleClickPopUpDetail,
    handleClickItemEdit,
    handleClickItemDelete,
    handleClickItemStatusChange,
    handleClickToggleDailyMode,
  } = TaskItemHandlers(task.id, setIsDone);
  //추후 필요한 인자는 데이터 작업중 파악하여 추가 예정
  const safeFormatDate = (dateString: string | undefined | null) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    if (!isValid(date)) return '';

    return format(date, 'yyyy년 MM월 dd일');
  };

  return (
    <TaskListItem
      key={task.id}
      type="taskList"
      onCheckStatusChange={handleClickItemStatusChange}
      onEdit={handleClickItemEdit}
      onDelete={handleClickItemDelete}
      onClick={handleClickPopUpDetail}
      onClickToggleDailyMode={handleClickToggleDailyMode}
      isDone={isDone}
      description={task.description}
      commentCount={task.commentCount}
      date={safeFormatDate(task.date)}
      frequency={task.frequency}
    />
  );
}
