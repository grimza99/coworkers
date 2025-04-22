'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { createContext, use, useState, useEffect, Suspense } from 'react';
import { createPortal } from 'react-dom';

type ModalContextType = {
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function useModal() {
  const ctx = use(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
}

function ModalProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [modalRoot, setModalRoot] = useState<Element | null>(null);

  useEffect(() => {
    const modalElement = document.querySelector('#modal');
    setModalRoot(modalElement);
  }, []);

  const closeModal = () => router.back();

  const show = searchParams.get('showDialog') === 'y';

  if (!modalRoot) return null;

  return show
    ? createPortal(
        <ModalContext.Provider value={{ closeModal }}>{children}</ModalContext.Provider>,
        modalRoot
      )
    : null;
}

type ModalProps = {
  children: React.ReactNode;
};

export default function Modal({ children }: ModalProps) {
  return (
    // 정적 렌더링되는 라우트 안에서 useSearchParams를 사용하는 컴포넌트에 <Suspense/> 경계를 씌워야합니다.
    // https://nextjs.org/docs/app/api-reference/functions/use-search-params#static-rendering
    <Suspense fallback={null}>
      <ModalProvider>{children}</ModalProvider>
    </Suspense>
  );
}
