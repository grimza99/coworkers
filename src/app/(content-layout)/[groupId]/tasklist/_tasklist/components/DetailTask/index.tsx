'use client';
import Image from 'next/image';
import Content from './Content';
import Comments from './Comments';
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
            <Content task={task} />
            <Comments />
            <Button className="absolute -bottom-6" variant={isDone ? 'outline-primary' : 'solid'}>
              <Check className={clsx(isDone ? 'text-primary' : 'text-gray-100')} />
              {buttonText}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
