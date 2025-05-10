'use client';
import { createContext } from 'react';

type ModalContextValue = {
  toggleModal: (id: string) => void;
  openModal: (id: string) => void;
  closeModal: (id: string) => void;
  checkIsModalOpen: (id: string) => boolean;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export default ModalContext;
