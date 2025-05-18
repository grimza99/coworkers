'use client';
import TaskListItem from '@/components/task-list-item/TaskListItem';
import { format, isValid } from 'date-fns';
import { useEffect, useState } from 'react';
import { DetailTaskType, Task } from '../types/task-type';
import RemoveTaskModal from './ModalContents/RemoveTaskModal';
import { useTaskActions } from '../hooks/use-task-actions';
import { useTaskModals } from '../hooks/use-task-modals';
import ManageTaskItemModal from './manage-task-item-modal/MangeTaskItemModal';
import DetailTask from '../../@detailTask/page';
import getDetailTaskItem from '@/lib/api/detail-task-item';

interface Props {
  task: Task;
  groupId: string;
  taskListId: number;
}

export default function TasksWiseTask({ task, groupId, taskListId }: Props) {
  const [isDone, setIsDone] = useState(!!task.doneAt);
  const [isDelete, setIsDelete] = useState(false);
  const [isDetailTaskOpen, setIsDetailTaskOpen] = useState(false);
  const [detailTask, setDetailTask] = useState<DetailTaskType>();

  useEffect(() => {
    const fetchDetailItem = async () => {
      if (!task) return;
      const taskId = task.id;
      const numberGroupId = Number(groupId);

      const data = await getDetailTaskItem({ groupId: numberGroupId, taskListId, taskId });
      setDetailTask(data);
    };
    fetchDetailItem();
  }, [groupId, taskListId, task]);

  const taskDeleteModalId = `${task.id}-delete`;
  const createOrEditModalId = task ? `${task.id}-edit` : `${taskListId}-create`;

  const { popUpDeleteTaskModal, popUpEditTaskModal } = useTaskModals();
  const { deleteTask } = useTaskActions();
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

  const setTaskToDeleteState = () => {
    setIsDelete(true);
  };

  const openDetailTask = () => {
    setIsDetailTaskOpen(true);
  };

  const closeDetailTask = () => {
    setIsDetailTaskOpen(false);
  };

  return (
    <>
      {!isDelete && (
        <>
          <TaskListItem
            key={task.id}
            type="taskList"
            onCheckStatusChange={() =>
              toggleTaskDone(groupId, taskListId, isDone, toggleTaskStatus)
            }
            onEdit={() => popUpEditTaskModal(createOrEditModalId)}
            onDelete={() => popUpDeleteTaskModal(taskDeleteModalId)}
            onClick={() => openDetailTask()}
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
            closeDetailTask={closeDetailTask}
            isOpen={isDetailTaskOpen}
          />
          <RemoveTaskModal
            taskName={task.name}
            modalId={taskDeleteModalId}
            deleteTask={() => deleteTask(groupId, taskListId, task.id, setTaskToDeleteState)}
          />
          <ManageTaskItemModal
            detailTask={detailTask}
            groupId={Number(groupId)}
            taskListId={taskListId}
            isDone={isDone}
            createOrEditModalId={createOrEditModalId}
          />
        </>
      )}
    </>
  );
}
