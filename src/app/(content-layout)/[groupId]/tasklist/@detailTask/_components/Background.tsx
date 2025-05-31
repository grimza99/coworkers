'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useCallback, useEffect, useRef } from 'react';

interface Props {
  children: ReactNode;
  isOpen: boolean;
}
export default function Background({ children, isOpen }: Props) {
  const detailTaskRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const closingDetailTaskOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (!isOpen) return;

      const target = e.target as Node;

      const isInsideDetail = detailTaskRef.current?.contains(target);
      const modalPortal = document.querySelector('#modal-container');
      const isInsidePortal = modalPortal?.contains(target);

      if (!isInsideDetail && !isInsidePortal) {
        router.back();
      }
    },
    [isOpen]
  );

  useEffect(() => {
    document.addEventListener('mousedown', closingDetailTaskOutsideClick);
    return () => {
      document.removeEventListener('mousedown', closingDetailTaskOutsideClick);
    };
  }, [isOpen, closingDetailTaskOutsideClick]);

  return (
    <div>
      <div ref={detailTaskRef}>{children}</div>
    </div>
  );
}
