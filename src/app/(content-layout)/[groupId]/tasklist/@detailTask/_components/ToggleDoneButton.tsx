'use client';
import Check from '@/assets/Check';
import Button from '@/components/common/Button';
import clsx from 'clsx';
import { useTaskActions } from '../../_tasklist/hooks/use-task-actions';
import { DetailTaskType } from '../../_tasklist/types/task-type';

interface Props {
  isDone: boolean;
  task: DetailTaskType;
}

export default function ToggleDoneButton({ isDone, task }: Props) {
  const { toggleTaskDone } = useTaskActions(task);

  const buttonText = isDone ? '완료 취소하기' : '완료 하기';
  return (
    <Button
      onClick={() => toggleTaskDone(isDone)}
      className="absolute right-6 bottom-6 lg:right-10 lg:bottom-10"
      variant={isDone ? 'outline-primary' : 'solid'}
      size={isDone ? 'lg' : 'sm'}
    >
      <Check className={clsx(isDone ? 'text-primary' : 'text-gray100')} />
      {buttonText}
    </Button>
  );
}
