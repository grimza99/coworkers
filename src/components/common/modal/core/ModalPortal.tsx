'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import useModalContext from '@/components/common/modal/core/useModalContext';

export default function ModalPortal({
  children,
  modalId,
}: {
  children: React.ReactNode;
  modalId: string;
}) {
  const [modalPortal, setModalPortal] = useState<Element | null>(null);
  const { checkIsModalOpen } = useModalContext();

  useEffect(
    function initializeModalPortal() {
      const modalElement = document.querySelector('#modal-container');
      setModalPortal(modalElement);
    },
    [setModalPortal]
  );

  if (!modalPortal) return null;

  return <>{createPortal(checkIsModalOpen(modalId) ? children : null, modalPortal)}</>;
}
