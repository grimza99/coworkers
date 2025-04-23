'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import useModalContext from '@/components/common/modal/core/useModalContext';

export default function ModalPortal({ children }: { children: React.ReactNode }) {
  const [modalPortal, setModalPortal] = useState<Element | null>(null);
  const { isOpen } = useModalContext();

  useEffect(() => {
    const modalElement = document.querySelector('#modal');
    setModalPortal(modalElement);
  }, []);

  if (!modalPortal) return null;

  return <>{createPortal(isOpen ? children : null, modalPortal)}</>;
}
