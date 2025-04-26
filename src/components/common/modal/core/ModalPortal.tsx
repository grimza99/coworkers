'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import useModalContext from '@/components/common/modal/core/useModalContext';

export default function ModalPortal({ children }: { children: React.ReactNode }) {
  const [modalPortal, setModalPortal] = useState<Element | null>(null);
  const { isOpen } = useModalContext();

  useEffect(
    function initializeModalPortal() {
      const modalElement = document.querySelector('#modal-container');
      setModalPortal(modalElement);
    },
    [setModalPortal]
  );

  if (!modalPortal) return null;

  return <>{createPortal(isOpen ? children : null, modalPortal)}</>;
}
