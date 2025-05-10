'use client';
import { useState } from 'react';
import ModalContext from '@/components/common/modal/core/ModalContext';

export interface ModalState {
  [id: string]: { isOpen: boolean };
}

export default function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modals, setModals] = useState<ModalState>({});

  const openModal = (id: string) => {
    setModals((prev) => ({
      ...prev,
      [id]: { isOpen: true },
    }));
  };

  const closeModal = (id: string) => {
    setModals((prev) => ({
      ...prev,
      [id]: { isOpen: false },
    }));
  };

  const toggleModal = (id: string) => {
    setModals((prev) => ({
      ...prev,
      [id]: { isOpen: prev[id]?.isOpen !== true },
    }));
  };

  const checkIsModalOpen = (id: string) => {
    return !!modals[id]?.isOpen;
  };

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        toggleModal,
        checkIsModalOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
