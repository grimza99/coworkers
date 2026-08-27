'use client';
import TaskListItem from '@/components/task-list-item/TaskListItem';
import { format, isValid } from 'date-fns';
import { useEffect, useState } from 'react';
import { DetailTaskType, Task } from '../types/task-type';
import RemoveTaskModal from './ModalContents/RemoveTaskModal';
import { useTaskActions } from '../hooks/use-task-actions';
import { useTaskModals } from '../hooks/use-task-modals';
import ManageTaskItemModal from './manage-task-item-modal/MangeTaskItemModal';
import getDetailTaskItem from '@/lib/api/detail-task-item';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDndMonitor } from '@dnd-kit/core';
import { useRouter } from 'next/navigation';

interface Props {
  task: Task;
  groupId: string;
  taskListId: number;
}

export default function TasksWiseTask({ task, groupId, taskListId }: Props) {
  const [isDone, setIsDone] = useState(!!task.doneAt);
  const [isDelete, setIsDelete] = useState(false);
  const [detailTask, setDetailTask] = useState<DetailTaskType>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  });
  const [onDrag, setOnDrag] = useState(false);

  const router = useRouter();

  useDndMonitor({
    onDragStart: () => setOnDrag(true),
    onDragEnd: () => setOnDrag(false),
    onDragCancel: () => setOnDrag(false),
  });

  useEffect(() => {
    const fetchDetailItem = async () => {
      if (!task || !isDropdownOpen) return;
      const taskId = task.id;
      const numberGroupId = Number(groupId);

      const data = await getDetailTaskItem({ groupId: numberGroupId, taskListId, taskId });
      setDetailTask(data);
    };
    fetchDetailItem();
  }, [isDropdownOpen, groupId, taskListId, task]);

  const checkDropdownOpen = () => {
    setIsDropdownOpen((prev) => !prev);
  };

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
    router.push(`/${groupId}/tasks/${task.id}`);
  };

  return (
    <>
      {!isDelete && (
        <div
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          style={{
            transform: CSS.Transform.toString(transform),
            transition: transition ?? undefined,
            opacity: isDragging ? 0.5 : 1,
          }}
        >
          <TaskListItem
            key={task.id}
            type="taskList"
            checkDropdownOpen={checkDropdownOpen}
            onCheckStatusChange={() => toggleTaskDone(isDone, toggleTaskStatus)}
            onEdit={() => popUpEditTaskModal(createOrEditModalId)}
            onDelete={() => popUpDeleteTaskModal(taskDeleteModalId)}
            isDone={isDone}
            onClick={() => openDetailTask()}
            name={task.name}
            commentCount={task.commentCount}
            date={safeFormatDate(task.date)}
            frequency={task.frequency}
          />
          <RemoveTaskModal
            taskName={task.name}
            modalId={taskDeleteModalId}
            deleteTask={() => deleteTask(groupId, taskListId, task.id, setTaskToDeleteState)}
          />
          {!onDrag && (
            <ManageTaskItemModal
              detailTask={detailTask}
              groupId={Number(groupId)}
              taskListId={taskListId}
              isDone={isDone}
              createOrEditModalId={createOrEditModalId}
            />
          )}
        </div>
      )}
    </>
  );
}
