'use client';
import { useState, useEffect, Suspense } from 'react';
import { createPortal } from 'react-dom';
import ModalProvider from '@/components/common/modal/ModalProvider';

export default function ModalRoot({ children }: { children: React.ReactNode }) {
  const [modalRoot, setModalRoot] = useState<Element | null>(null);

  useEffect(() => {
    const modalElement = document.querySelector('#modal');
    setModalRoot(modalElement);
  }, []);

  if (!modalRoot) return null;

  return (
    // 정적 렌더링되는 라우트 안에서 useSearchParams를 사용하는 컴포넌트에 <Suspense/> 경계를 씌워야합니다.
    // https://nextjs.org/docs/app/api-reference/functions/use-search-params#static-rendering
    <Suspense fallback={null}>
      {createPortal(<ModalProvider>{children}</ModalProvider>, modalRoot)}
    </Suspense>
  );
}
