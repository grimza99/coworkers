'use client';
import Image from 'next/image';
import Content from './DetailTaskContentField';
import { Task } from '../../types/task-type';
import Button from '@/components/common/Button';
import Check from '@/assets/Check';
import clsx from 'clsx';
import DetailTaskCommentField from './DetailTaskCommentsField';
import axiosClient from '@/lib/axiosClient';
import { useCallback, useEffect, useState } from 'react';
import { useTaskActions } from '../../hooks/use-task-actions';

interface Props {
  groupId: string;
  taskListId: number;
  isOpen: boolean;
  isDone: boolean;
  setIsDone: React.Dispatch<React.SetStateAction<boolean>>;
  taskId: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/**@todo
 * 1. fetchTask 에러 핸들링
 */

export function DetailTask({
  groupId,
  taskId,
  taskListId,
  isOpen,
  setIsOpen,
  isDone,
  setIsDone,
}: Props) {
  const [currentTask, setCurrentTask] = useState<Task>();
  const { taskStatusChange } = useTaskActions(currentTask);
  const buttonText = isDone ? '완료 취소하기' : '완료 하기';

  const fetchTask = useCallback(async () => {
    if (!isOpen || !taskId) return;

    const { data } = await axiosClient(
      `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`
    );

    setCurrentTask(data);
  }, [groupId, taskListId, taskId, isOpen]);

  useEffect(() => {
    fetchTask();
  }, [isOpen, fetchTask]);

  if (!currentTask) return;

  return (
    <>
      {isOpen && (
        <div className="bg-bg200 fixed top-15 right-0 z-500 flex h-[calc(100%-60px)] w-full flex-col gap-25 px-4 py-4 md:max-w-[700px] md:gap-45.5 md:px-6 md:py-6 lg:max-w-[779px] lg:px-10 lg:py-10">
          <div className="relative flex h-full flex-col gap-4">
            <button onClick={() => setIsOpen(false)}>
              <Image src="/icons/close.svg" alt="x" width={24} height={24} />
            </button>
            <div className="flex h-full flex-col gap-25 overflow-scroll">
              <Content isDone={isDone} task={currentTask} />
              <DetailTaskCommentField taskId={currentTask.id} />
            </div>
          </div>
          <Button
            onClick={() => taskStatusChange(groupId, taskListId, isDone, setIsDone)}
            className="absolute right-6 bottom-6 lg:right-10 lg:bottom-10"
            variant={isDone ? 'outline-primary' : 'solid'}
            size={isDone ? 'lg' : 'sm'}
          >
            <Check className={clsx(isDone ? 'text-primary' : 'text-gray100')} />
            {buttonText}
          </Button>
        </div>
      )}
    </>
  );
}
