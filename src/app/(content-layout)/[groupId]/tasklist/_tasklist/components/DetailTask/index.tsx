'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Task } from '../../types/task-list-page-type';
import Content from './Content';

interface Props {
  task: Task;
}
export function DetailTask({ task }: Props) {
  if (!task) return;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-bg200 absolute -top-6 -right-6 flex h-[calc(100%-60px)] w-full flex-col gap-25 px-4 py-4 md:max-w-[744px] md:gap-45.5 md:px-6 md:py-6 lg:max-w-[779px] lg:px-10 lg:py-10">
      <div className="flex flex-col gap-4">
        <button onClick={() => setIsOpen(false)}>
          <Image src="/icons/close.svg" alt="x" width={24} height={24} />
        </button>
        <Content task={task} />
        <div>댓글 영역</div>
      </div>
    </div>
  );
}
