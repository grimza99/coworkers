'use client';
import { createContext } from 'react';

type ModalContextType = {
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export default ModalContext;
