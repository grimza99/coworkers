'use client';
import TaskListItem from '@/components/task-list-item/TaskListItem';
import { format, isValid } from 'date-fns';
import { useState } from 'react';
import { Task } from '../types/task-list-page-type';
import { taskHandlers } from '../utils/task-handlers';

interface Props {
  task: Task;
  groupId: string;
  taskListId: number;
}

export default function TaskListWiseTasks({ task, groupId, taskListId }: Props) {
  const [isDone, setIsDone] = useState(Boolean(task.doneAt));

  const {
    handleClickPopUpDetail,
    handleClickItemEdit,
    handleClickItemDelete,
    handleClickItemStatusChange,
    handleClickToggleDailyMode,
  } = taskHandlers(task);

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
      onCheckStatusChange={() =>
        handleClickItemStatusChange(groupId, taskListId, isDone, setIsDone)
      }
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
