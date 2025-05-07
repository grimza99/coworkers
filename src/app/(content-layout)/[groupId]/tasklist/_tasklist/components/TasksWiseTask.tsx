'use client';
import TaskListItem from '@/components/task-list-item/TaskListItem';
import { format, isValid } from 'date-fns';
import { useState } from 'react';
import { Task } from '../types/task-type';
import { DetailTask } from './DetailTask';
import RemoveTaskModal from './ModalContents/RemoveTaskModal';
import { useTaskActions } from '../hooks/use-task-actions';
import { useTaskModals } from '../hooks/use-task-modals';

interface Props {
  task: Task;
  groupId: string;
  taskListId: number;
}

export default function TasksWiseTask({ task, groupId, taskListId }: Props) {
  const [isDone, setIsDone] = useState(!!task.doneAt);
  const [isDetailTaskOpen, setIsDetailTaskOpen] = useState(false);

  const taskDeleteModalId = `${task.id}-delete`;
  const taskEditModalId = `${task.id}-edit`;
  const { popUpDeleteTaskModal, popUpEditTaskModal, popUpDetailTask } = useTaskModals();
  const { toggleTaskDone } = useTaskActions(task);

  const safeFormatDate = (dateString: string | undefined | null) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    if (!isValid(date)) return '';

    return format(date, 'yyyy년 MM월 dd일');
  };

  const toggleTaskStatus = () => {
    setIsDone((prev) => !prev);
  };

  const detailTaskOpen = () => {
    setIsDetailTaskOpen((prev) => !prev);
  };
  return (
    <>
      <TaskListItem
        key={task.id}
        type="taskList"
        onCheckStatusChange={() => toggleTaskDone(groupId, taskListId, isDone, toggleTaskStatus)}
        onEdit={() => popUpEditTaskModal(taskEditModalId)}
        onDelete={() => popUpDeleteTaskModal(taskDeleteModalId)}
        onClick={() => popUpDetailTask(detailTaskOpen)}
        isDone={isDone}
        name={task.name}
        commentCount={task.commentCount}
        date={safeFormatDate(task.date)}
        frequency={task.frequency}
      />
      <DetailTask
        isDone={isDone}
        setIsDone={toggleTaskStatus}
        taskId={task.id}
        groupId={groupId}
        taskListId={taskListId}
        setIsOpen={detailTaskOpen}
        isOpen={isDetailTaskOpen}
      />
      <RemoveTaskModal
        taskName={task.name}
        modalId={taskDeleteModalId}
        taskId={task.id}
        groupId={groupId}
        taskListId={taskListId}
      />
    </>
  );
}
