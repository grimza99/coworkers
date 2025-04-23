'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import ModalContext from '@/components/common/modal/ModalContext';

export default function ModalProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const closeModal = () => router.back();

  const show = searchParams.get('showModal') === 'y';

  return (
    <ModalContext.Provider value={{ closeModal }}>{show ? children : null}</ModalContext.Provider>
  );
}
