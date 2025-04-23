'use client';
import { createContext } from 'react';

type ModalContextValue = {
  toggleModal: () => void;
  openModal: () => void;
  closeModal: () => void;
  isOpen: boolean;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export default ModalContext;
