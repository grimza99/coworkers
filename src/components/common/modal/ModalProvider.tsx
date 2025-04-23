'use client';
import ModalContext from '@/components/common/modal/ModalContext';
import { useState } from 'react';

export default function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ toggleModal, openModal, closeModal, isOpen }}>
      {children}
    </ModalContext.Provider>
  );
}
