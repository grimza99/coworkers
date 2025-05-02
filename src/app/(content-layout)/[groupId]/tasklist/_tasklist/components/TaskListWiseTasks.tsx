'use client';
import TaskListItem from '@/components/task-list-item/TaskListItem';
import { format, isValid } from 'date-fns';
import { useState } from 'react';
import { Task } from '../types/task-list-page-type';
import { useTaskHandlers } from '../utils/task-handlers';
import { DetailTask } from './DetailTask';
import RemoveTaskModal from './ModalContents/RemoveTaskModalPopUp';

interface Props {
  task: Task;
  groupId: string;
  taskListId: number;
}

export default function TaskListWiseTasks({ task, groupId, taskListId }: Props) {
  const [isDone, setIsDone] = useState(Boolean(task.doneAt));
  const [isOpen, setIsOpen] = useState(false);

  const {
    popUpDeleteTaskModal,
    popUpEditTaskModal,
    PopUpDetailTask,
    taskStatusChange,
    toggleDailyMode,
  } = useTaskHandlers(task);

  const safeFormatDate = (dateString: string | undefined | null) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    if (!isValid(date)) return '';

    return format(date, 'yyyy년 MM월 dd일');
  };

  return (
    <>
      <TaskListItem
        key={task.id}
        type="taskList"
        onCheckStatusChange={() => taskStatusChange(groupId, taskListId, isDone, setIsDone)}
        onEdit={popUpEditTaskModal}
        onDelete={() => popUpDeleteTaskModal(`${task.id}`)}
        onClick={() => PopUpDetailTask(setIsOpen)}
        onClickToggleDailyMode={toggleDailyMode}
        isDone={isDone}
        description={task.description}
        commentCount={task.commentCount}
        date={safeFormatDate(task.date)}
        frequency={task.frequency}
      />
      <DetailTask
        isDone={isDone}
        setIsDone={setIsDone}
        taskId={task.id}
        groupId={groupId}
        taskListId={taskListId}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
      <RemoveTaskModal
        taskName={task.name}
        taskId={task.id}
        groupId={groupId}
        taskListId={taskListId}
      />
    </>
  );
}
