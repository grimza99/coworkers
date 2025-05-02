'use client';
import Image from 'next/image';
import Content from './Content';
import Comments from './DetailTaskCommentField';
import { Task } from '../../types/task-list-page-type';
import { useOutSideClickAutoClose } from '@/utils/use-outside-click-auto-close';
import Button from '@/components/common/Button';
import Check from '@/assets/Check';
import clsx from 'clsx';

interface Props {
  task: Task;
}
export function DetailTask({ task }: Props) {
  const { isOpen, setIsOpen, ref } = useOutSideClickAutoClose(true);
  if (!task) return;
  const isDone = Boolean(task.doneAt);
  const buttonText = isDone ? '완료 취소하기' : '완료 하기';

  const handleClickTaskStatusChange = () => {
    //던 상태를 취소 or 던 상태로 바꾸는 리퀘스트
  };
  return (
    <>
      {isOpen && (
        <div
          ref={ref}
          className="bg-bg200 fixed top-15 right-0 z-500 flex h-[calc(100%-60px)] w-full flex-col gap-25 px-4 py-4 md:max-w-[700px] md:gap-45.5 md:px-6 md:py-6 lg:max-w-[779px] lg:px-10 lg:py-10"
        >
          <div className="relative flex h-full flex-col gap-4">
            <button onClick={() => setIsOpen(false)}>
              <Image src="/icons/close.svg" alt="x" width={24} height={24} />
            </button>
            <div className="flex h-full flex-col gap-25 overflow-scroll">
              <Content task={task} />
              <Comments />
            </div>
          </div>
          <Button
            onClick={handleClickTaskStatusChange}
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
