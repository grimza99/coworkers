'use client';
import DetailTaskPage from '@/app/(content-layout)/[groupId]/tasks/[taskId]/page';
import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import DetailTask from '../../_components/DetailTask';

interface Props {
  groupId: string;
  taskListId: number;
  isOpen: boolean;
  isDone: boolean;
  setIsDone: () => void;
  taskId: number;
  closeDetailTask: () => void;
}

export default function DetailTaskContainer({ taskId, isOpen, closeDetailTask, ...props }: Props) {
  const detailTaskRef = useRef<HTMLDivElement>(null);

  const closingDetailTaskOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (!isOpen || !taskId) return;

      const target = e.target as Node;

      const isInsideDetail = detailTaskRef.current?.contains(target);
      const modalPortal = document.querySelector('#modal-container');
      const isInsidePortal = modalPortal?.contains(target);

      if (!isInsideDetail && !isInsidePortal) {
        closeDetailTask();
      }
    },
    [isOpen, taskId, closeDetailTask]
  );

  useEffect(() => {
    document.addEventListener('mousedown', closingDetailTaskOutsideClick);
    return () => {
      document.removeEventListener('mousedown', closingDetailTaskOutsideClick);
    };
  }, [isOpen, closingDetailTaskOutsideClick]);

  return (
    <>
      {isOpen && (
        <div
          ref={detailTaskRef}
          className="bg-bg200 animate-detail-task fixed top-15 right-0 z-500 flex h-[calc(100%-60px)] w-full flex-col gap-25 px-4 py-4 md:max-w-[700px] md:gap-45.5 md:px-6 md:py-6 lg:max-w-[779px] lg:px-10 lg:py-10"
        >
          <div className="relative flex h-full flex-col gap-4">
            <button onClick={() => closeDetailTask()}>
              <Image src="/icons/close.svg" alt="x" width={24} height={24} />
            </button>
            <ErrorBoundary fallback={<div>해당 태스크를 불러올 수 없습니다.</div>}>
              <DetailTask taskId={taskId} {...props} />
            </ErrorBoundary>
          </div>
        </div>
      )}
    </>
  );
}
