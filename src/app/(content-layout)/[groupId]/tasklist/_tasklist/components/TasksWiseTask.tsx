'use client';
import TaskListItem from '@/components/task-list-item/TaskListItem';
import { format, isValid } from 'date-fns';
import { useState } from 'react';
import { Task } from '../types/task-list-page-type';
import { useTaskHandlers } from '../utils/task-handlers';
import { DetailTask } from './DetailTask';
import RemoveTaskModal from './ModalContents/RemoveTaskModal';
import ManageTaskItemModal from './manage-task-item-modal/MangeTaskItemModal';

interface Props {
  task: Task;
  groupId: string;
  taskListId: number;
}

export default function TasksWiseTask({ task, groupId, taskListId }: Props) {
  const [isDone, setIsDone] = useState(!!task.doneAt);
  const [isDetailTaskOpen, setIsDetailTaskOpen] = useState(false);

  const taskDeleteModalId = `${task.id}-delete`;

  const createOrEditModalId = task ? `${task.id}-edit` : `${taskListId}-create`;

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
        onEdit={() => popUpEditTaskModal(createOrEditModalId)}
        onDelete={() => popUpDeleteTaskModal(taskDeleteModalId)}
        onClick={() => PopUpDetailTask(setIsDetailTaskOpen)}
        onClickToggleDailyMode={toggleDailyMode}
        isDone={isDone}
        name={task.name}
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
        setIsOpen={setIsDetailTaskOpen}
        isOpen={isDetailTaskOpen}
      />
      <RemoveTaskModal
        taskName={task.name}
        modalId={taskDeleteModalId}
        taskId={task.id}
        groupId={groupId}
        taskListId={taskListId}
      />
      <ManageTaskItemModal
        task={task}
        groupId={Number(groupId)}
        taskListId={taskListId}
        createOrEditModalId={createOrEditModalId}
      />
    </>
  );
}
